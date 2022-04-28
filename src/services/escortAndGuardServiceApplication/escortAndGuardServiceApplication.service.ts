import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEscortAndGuardServiceDto } from '@dtos/escortAndGuardService/escortAndGuardService.dto';
import { EscortAndGuardServiceApplicationEntity } from '@entities/EscortAndGuardService/EscortAndGuardServiceApplication.entity';
import { HttpException } from '@exceptions/HttpException';
import { EscortAndGuardServiceApplication } from '@interfaces/EscortAndGuardServiceApplication/EscortAndGuardServiceApplication.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class EscortAndGuardServiceApplicationService extends Repository<EscortAndGuardServiceApplicationEntity> {
  public async findAllEAG(): Promise<EscortAndGuardServiceApplication[]> {
    const records: EscortAndGuardServiceApplication[] = await EscortAndGuardServiceApplicationEntity.find();
    return records;
  }

  public async findByEAGId(eagId: number): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(eagId)) throw new HttpException(400, "You're not userId");

    const findEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.findOne({ where: { id: eagId } });
    if (!findEAG) throw new HttpException(409, "You're not user");

    return findEAG;
  }

  public async createEAG(payload: CreateEscortAndGuardServiceDto): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(payload)) throw new HttpException(400, "Payload required");
    const createEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.create(payload);
    return createEAG;
  }

  public async deleteUser(eagId: number): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(eagId)) throw new HttpException(400, "PD required");

    const findEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.findOne({ where: { id: eagId } });
    if (!findEAG) throw new HttpException(404, "No record found");

    await EscortAndGuardServiceApplicationEntity.delete({ id: eagId });
    return findEAG;
  }
}

export default EscortAndGuardServiceApplicationService;
