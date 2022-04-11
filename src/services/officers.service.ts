import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOfficerDto } from '@dtos/officer.dto';
import { OfficerEntity } from '@entities/officers.entity';
import { HttpException } from '@exceptions/HttpException';
import { IOfficers } from '@interfaces/officer.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class OfficerService extends Repository<OfficerEntity> {
  public async findAllOfficer(): Promise<IOfficers[]> {
    const Officers: IOfficers[] = await OfficerEntity.find();
    return Officers;
  }

  public async findOfficerById(OfficerId: number): Promise<IOfficers> {
    if (isEmpty(OfficerId)) throw new HttpException(400, "You're not OfficerId");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    if (!findOfficer) throw new HttpException(409, "You're not Officer");

    return findOfficer;
  }

  public async createOfficer(OfficerData: IOfficers): Promise<any> {
    if (isEmpty(OfficerData)) throw new HttpException(400, "You're not OfficerData");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { email: OfficerData.email } });
    if (findOfficer) throw new HttpException(409, `This email ${OfficerData.email} already exists`);

    const createOfficerData: IOfficers = await OfficerEntity.create(OfficerData);

    return createOfficerData;
  }

  public async updateOfficer(OfficerId: number, OfficerData: any): Promise<IOfficers> {
    if (isEmpty(OfficerData)) throw new HttpException(400, "You're not OfficerData");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    if (!findOfficer) throw new HttpException(409, "You're not Officer");

    await OfficerEntity.update(OfficerId, OfficerData);

    const updateOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    return updateOfficer;
  }

  public async deleteOfficer(OfficerId: number): Promise<IOfficers> {
    if (isEmpty(OfficerId)) throw new HttpException(400, "You're not OfficerId");

    const findOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: OfficerId } });
    if (!findOfficer) throw new HttpException(409, "You're not Officer");

    await OfficerEntity.delete({ id: OfficerId });
    return findOfficer;
  }
}

export default OfficerService;
