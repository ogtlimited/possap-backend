import { sendOtpSMS } from './../utils/sendOtpSms';
import { generateOTP } from './../utils/util';
import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto, UserOTPDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { PoliceExtractService } from '@services/police_extract.service';
import { PoliceCharacterCertificateService } from '@services/police_character_certificate.service';
import EscortAndGuardServiceApplicationService from '@services/escortAndGuardServiceApplication/escortAndGuardServiceApplication.service';
import { EscortAndGuardServiceApplicationEntity } from '@entities/EscortAndGuardService/EscortAndGuardServiceApplication.entity';

@EntityRepository()
class UserService extends Repository<UserEntity> {
  private extractService = new PoliceExtractService();
  private characterCertificateService = new PoliceCharacterCertificateService();

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

  public async findAllUserServices(user: User): Promise<{
    userExtractRecords?: any;
    userPCCRecords?: any;
    userEGSRecords?: any;
  }> {
    const userExtractRecords = await this.extractService.getApplicantsExtracts(user);
    const userPCCRecords = await this.characterCertificateService.getUserPoliceCharacterCertificateRecords(user);
    const userEGSRecords = await EscortAndGuardServiceApplicationEntity.find({ where: { userId: user.id } });
    return {
      userExtractRecords,
      userPCCRecords,
      userEGSRecords,
    };
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
    const otp =  generateOTP();
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword, otp }).save();
     // `Please use this otp code ${otp} to complete your registeration`
    // sendOtpSMS()
    return createUserData;
  }

  public async validateSignup(userId: number, userData: UserOTPDto): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    if (findUser && findUser.otp !== userData.otp) {
      throw new HttpException(409, 'Invalid OTP');
    }
    await UserEntity.update(userId, { ...findUser, active: true });

    const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
    return updateUser;
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
