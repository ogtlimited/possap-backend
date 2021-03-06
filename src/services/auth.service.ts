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

  public async login(userData: CreateUserDto): Promise<{ token: any; findUser: any }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { email: userData.email } });
    if (!findUser && !findOfficer) throw new HttpException(409, `You're email ${userData.email} not found`);

    if (findUser) {
      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

      const token = this.createToken(findUser);

      return { token, findUser };
    } else {
      const isPasswordMatching: boolean = await compare(userData.password, findOfficer.password);
      if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

      const token = this.createToken(findOfficer);

      return { token, findUser: findOfficer };
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
