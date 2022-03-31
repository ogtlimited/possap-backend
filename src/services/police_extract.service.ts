import {IPoliceExtract, IPoliceExtractService} from "@interfaces/police_extract.interface";
import {PoliceExtractDto} from "@dtos/police_extract.dto";
import {User} from "@interfaces/users.interface";
import {PoliceExtractEntity} from "@entities/police_extract.entity";
import {Entity} from "typeorm";

@Entity()
class PoliceExtractService implements IPoliceExtractService{

  async createExtract(user: User, payload: PoliceExtractDto): Promise<IPoliceExtract> {
    const createPoliceExtract: IPoliceExtract = await PoliceExtractEntity.create(payload).save();
    console.log(createPoliceExtract);
    return createPoliceExtract;

  }

  async getApplicantsExtract(user: User): Promise<IPoliceExtract[]> {
    return await PoliceExtractEntity.find({where: {userId: user.id}})
  }

  async getExtracts(): Promise<IPoliceExtract[]> {
    return await PoliceExtractEntity.find({where: {userId: user.id}})
  }

  async updateExtract(): Promise<IPoliceExtract> {
    return Promise.resolve(undefined);
  }

}
