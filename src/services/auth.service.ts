import { sendOtpSMS } from './../utils/sendOtpSms';
import { LoginUserDto, ChangePasswordDto, ResetPasswordDto } from './../dtos/users.dto';
import { OfficerEntity } from './../entities/officers.entity';
import { IOfficers } from './../interfaces/officer.interface';
import { compare, hash } from 'bcrypt';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { SmsHelperDto } from '@/dtos/helpers/sms-helper.dto';

@EntityRepository()
class AuthService extends Repository<UserEntity> {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ token: any; findUser: any }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    console.log(userData);
    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    // const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    if (findUser) {
      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      console.log('matchingh');
      if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

      const token = this.createToken(findUser);

      return { token, findUser };
    }
    // else {
    //   const isPasswordMatching: boolean = await compare(userData.password, findOfficer.password);
    //   if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    //   const token = this.createToken(findOfficer);

    //   return { token, findUser: findOfficer };
    // }
  }
  public async changePassword(userId, userData: ChangePasswordDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(404, `User  not found`);
    const isPasswordMatching: boolean = await compare(userData.oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'password does not match');

    const hashedPassword = await hash(userData.newPassword, 10);
    // findUser.password = hashedPassword;
    const obj = {
      password: hashedPassword,
    };
    await UserEntity.update({ id: userId }, obj, null);

    const updateUser: User = await UserEntity.findOne({ where: { id: userId } });

    return updateUser;
  }
  public async sendResetPasswordOtp(userData: ResetPasswordDto): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await UserEntity.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(404, `User  not found`);

    // try {
    //   const send = await sendOtpSMS({ phone: findUser.phone });
    //   console.log('send error', send);
    //   if (send.status === 400) {
    //     throw 'failed to verify phone number';
    //   }
    // } catch (error) {
    //   console.log(error);
    //   throw new HttpException(409, error);
    // }

    return findUser;
  }
  public async validateResetPasswordOTP(email: string, userData: SmsHelperDto): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const user: User = await UserEntity.findOne({ where: { email: email } });

    console.log(user);
    if (!user) throw new HttpException(409, 'User not found');
    try {
      // const verify: any = await verifyOtp(userData);
      // console.log('verify otp', verify);
      // if (!verify.valid) {
      // if (!verify.valid) {
      //   throw 'Invalid OTP';
      // } else {
      //   const token = this.createToken(user);

      //   return { token, user };
      // }
      const token = this.createToken(user);
      return { token, user };
    } catch (error) {
      throw new HttpException(500, error);
    }
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
