import { OfficerProfileEntity } from './../entities/officerProfile.entity';
import { OfficerAccessEntity } from './../entities/officerAccess.entity';
import { verifyOtp } from './../utils/sendOtpSms';
import { SmsHelperDto } from '@/dtos/helpers/sms-helper.dto';
import { sendOtpSMS } from '@/utils/sendOtpSms';
import { CommandAccessEntity } from '@entities/commandAccess.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateOfficerDto } from '@dtos/officer.dto';
import { hash } from 'bcrypt';
import { OfficerEntity } from '@entities/officers.entity';
import { HttpException } from '@exceptions/HttpException';
import { IOfficers } from '@interfaces/officer.interface';
import { isEmpty } from '@utils/util';
import { ICommandAccess } from '@/interfaces/commandAccess';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import config from 'config';
import { sign } from 'jsonwebtoken';
import HelperController from '@/controllers/helper-controller/helper.controller';

@EntityRepository()
class OfficerService extends Repository<OfficerEntity> {
  public commandAccess = new CommandAccessEntity();
  public helperc = new HelperController();
  // public OfficerAccess = new OfficerAccessEntity();
  public async findAllOfficer(): Promise<IOfficers[]> {
    const Officers: IOfficers[] = await getRepository(OfficerEntity).find();
    return Officers;
  }

  public async findOfficerById(OfficerId: number): Promise<IOfficers> {
    if (isEmpty(OfficerId)) throw new HttpException(400, "You're not OfficerId");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    if (!findOfficer) throw new HttpException(409, "You're not Officer");

    return findOfficer;
  }
  public async loginOfficer(apNumber: number): Promise<IOfficers> {
    if (isEmpty(apNumber)) throw new HttpException(400, "You're not OfficerId");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { apNumber: apNumber } });
    if (!findOfficer) throw new HttpException(409, 'This AP Numnber is not attached to any officer');
    // try {
    //   const send = await sendOtpSMS({ phone: findOfficer.phoneNumber });
    //   console.log('send error', send);
    //   if (send.status === 400) {
    //     throw 'failed to verify phone number';
    //   }
    // } catch (error) {
    //   console.log(error);
    //   throw new HttpException(409, error);
    // }

    return findOfficer;
  }
  public async validateOfficerOTP(apNumber: number, userData: SmsHelperDto): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const officer: IOfficers = await OfficerEntity.findOne({ where: { apNumber: apNumber } });
    const { officerFormation, officerDepartment, officerSection, officerSubSection } = officer.profile;
    const CDetails = [officerFormation, officerDepartment, officerSection];
    if (officerSubSection && officerSubSection.length > 0) {
      CDetails.push(officerSubSection);
    }

    const reverseDeepLook = this.helperc.reversedeepLook(CDetails, CDetails.length);
    officer.primaryCommandInfo = {
      officerFormation: reverseDeepLook[0],
      officerDepartment: reverseDeepLook[1],
      officerSection: reverseDeepLook[2],
      officerSubSection: reverseDeepLook.length === 4 ? reverseDeepLook[3] : '',
    };
    console.log(officer);
    console.log(reverseDeepLook);
    if (!officer) throw new HttpException(409, 'AP number is not attched to a user');
    try {
      // const verify: any = await verifyOtp(userData);
      // console.log('verify otp', verify);
      // if (!verify.valid) {
      // if (!verify.valid) {
      //   throw 'Invalid OTP';
      // } else {
      //   const token = this.createToken(officer);

      //   return { token, officer };
      // }
      const token = this.createToken(officer);
      return { token, officer };
    } catch (error) {
      throw new HttpException(500, error);
    }
  }

  public async createOfficer(OfficerData: CreateOfficerDto): Promise<any> {
    if (isEmpty(OfficerData)) throw new HttpException(400, "You're not OfficerData");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { email: OfficerData.email } });
    if (findOfficer) throw new HttpException(409, `This email ${OfficerData.email} already exists`);
    const hashedPassword = await hash(OfficerData.password, 10);
    const createOfficerData: IOfficers = await OfficerEntity.create({ ...OfficerData, password: hashedPassword }).save();
    // console.log(createOfficerData);
    // const updatedOfficer = this.addCommandAccess(createOfficerData.id, OfficerData.commandAccess);
    return createOfficerData;
  }

  async addCommandAccess(id: number, services: ICommandAccess[]): Promise<any> {
    let officer: any = await this.findOfficerById(id);
    console.log('officer', services);
    if (services.length > 0) {
      for (let index = 0; index < services.length; index++) {
        const commandA = new CommandAccessEntity();
        commandA.officerFormation = services[index].officerFormation;
        commandA.officerDepartment = services[index].officerDepartment;
        commandA.officerSection = services[index].officerSection;
        commandA.officerSubSection = services[index].officerSubSection;

        officer.commandAccessIds.push(commandA);
        console.log('catch error', commandA);
        await CommandAccessEntity.save(commandA);
      }
    }

    officer = await OfficerEntity.save(officer);
    return officer;
  }

  public async updateOfficer(OfficerId: number, OfficerData: any): Promise<IOfficers> {
    if (isEmpty(OfficerData)) throw new HttpException(400, "You're not OfficerData");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    if (!findOfficer) throw new HttpException(409, "You're not Officer");
    console.log(OfficerData);
    if (OfficerData.access) {
      await this.updateOfficerAccess(findOfficer.access.id, OfficerData.access);
    }
    if (OfficerData.profile) {
      await this.updateOfficerAccess(findOfficer.profile.id, OfficerData.profile);
    }
    await OfficerEntity.update(OfficerId, OfficerData);

    const updateOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    return updateOfficer;
  }
  public async updateOfficerAccess(OfficerId: string, OfficerData: any): Promise<IOfficers> {
    if (isEmpty(OfficerData)) throw new HttpException(400, "You're not OfficerData");

    const access = await OfficerAccessEntity.findOne({ where: { id: OfficerId } });
    if (!access) throw new HttpException(409, 'Access id not found');
    console.log(OfficerData);
    await OfficerAccessEntity.update(OfficerId, OfficerData);

    const updateOfficer: IOfficers = await OfficerEntity.findOne({ where: { access: OfficerId } });
    return updateOfficer;
  }
  public async updateOfficerProfile(OfficerId: string, OfficerData: any): Promise<IOfficers> {
    if (isEmpty(OfficerData)) throw new HttpException(400, "You're not OfficerData");

    const profile = await OfficerProfileEntity.findOne({ where: { id: OfficerId } });
    if (!profile) throw new HttpException(409, 'Profile id not found');
    console.log(OfficerData);
    await OfficerProfileEntity.update(OfficerId, OfficerData);

    const updateOfficer: IOfficers = await OfficerEntity.findOne({ where: { access: OfficerId } });
    return updateOfficer;
  }

  public async deleteOfficer(OfficerId: number): Promise<IOfficers> {
    if (isEmpty(OfficerId)) throw new HttpException(400, "You're not OfficerId");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    if (!findOfficer) throw new HttpException(409, "You're not Officer");

    await OfficerEntity.delete({ id: OfficerId });
    return findOfficer;
  }
  public createToken(user): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 30;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default OfficerService;
