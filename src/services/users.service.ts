import { verifyOtp } from './../utils/sendOtpSms';
import { generateOTP } from './../utils/util';
import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto, UserOTPDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { sendOtpSMS } from '@/utils/sendOtpSms';
import { SmsHelperDto } from '@/dtos/helpers/sms-helper.dto';
const Twilio = require('twilio');

@EntityRepository()
class UserService extends Repository<UserEntity> {
  constructor() {
    super();
    // SMSVerify()
    // const twilioClient = new Twilio(process.env.TWILIO_API_KEY,
    //   process.env.TWILIO_API_SECRET,
    //   {accountSid: process.env.TWILIO_ACCOUNT_SID});
    // sendOtpSMS({ body: 'hello world', to: '+2347066565263' });
  }

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserEntity.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async findAllUserServices(user: User) {
    return {};
  }

  public async createUser(userData): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    console.log(userData);
    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    console.log(userData.phone);
    const createUserData: User = await UserEntity.save({ ...userData, password: hashedPassword });
    try {
      const send = await sendOtpSMS({ phone: userData.phone });
      console.log('send error', send.status);
      if (send.status === 400) {
        this.deleteUser(createUserData.id);
        throw 'failed to verify phone number';
      } else {
        return createUserData;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(409, error);
    }
  }

  public async validateSignup(userId: number, userData: SmsHelperDto): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");
    try {
      const verify: any = await verifyOtp(userData);
      console.log('verify otp', verify);
      if (!verify.valid) {
        throw 'Invalid OTP';
      } else {
        await UserEntity.update(userId, { ...findUser, active: true });

        const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
        return updateUser;
      }
    } catch (error) {
      throw new HttpException(500, error);
    }
  }
  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await UserEntity.update(userId, { ...userData, password: hashedPassword });

    const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await UserEntity.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
