import {IPoliceExtract, IPoliceExtractService} from "@interfaces/police_extract.interface";
import {PoliceExtractDto} from "@dtos/police_extract.dto";
import {User} from "@interfaces/users.interface";
import {PoliceExtractEntity} from "@entities/police_extract.entity";
import {Entity} from "typeorm";
import {IOfficers} from "@interfaces/officer.interface";
import {HttpException} from "@exceptions/HttpException";

@Entity()
class PoliceExtractService implements IPoliceExtractService{

  async createExtract(user: User, payload: PoliceExtractDto): Promise<IPoliceExtract> {
    const createPoliceExtract: IPoliceExtract = await PoliceExtractEntity.create(payload).save();
    console.log(createPoliceExtract);
    return createPoliceExtract;

  }

  async getApplicantsExtracts(user: User): Promise<IPoliceExtract[]> {
    return await PoliceExtractEntity.find({where: {userId: user.id}})
  }

  async getOfficerExtracts(officer:IOfficers): Promise<IPoliceExtract[]> {
    let approvalLevel = officer.extractApprovalLevel.extractFirstApproval? 1 : 2
    return await PoliceExtractEntity.find({where: {approval_level: approvalLevel, police_division_area: officer.officerSection, status: "pending"}})
  }

  async getExtract(id: number): Promise<IPoliceExtract[]> {
    return await PoliceExtractEntity.find({where: {id}})
  }

  // middleware should check if officer is allowed to approve.
  async approveExtract(id: number, officer:IOfficers): Promise<{message: "extracted approved"}> {
    let extract:IPoliceExtract = await PoliceExtractEntity.findOne({where: {id}})
    if(officer.extractApprovalLevel.extractFirstApproval && extract.status != "rejected"){
      await PoliceExtractEntity.createQueryBuilder()
        .update(PoliceExtractEntity)
        .set({approval_level: 2})
        .where("id = :id", {id})
        .execute()
       return {message: "extracted approved"}
    }else{
      await PoliceExtractEntity.createQueryBuilder()
        .update(PoliceExtractEntity)
        .set({status: "approved"})
        .where("id = :id", {id})
        .execute()
      return {message: "extracted approved"}
    }
  }

  // middleware should check if officer is allowed to approve.
  async rejectExtract(id: number, officer:IOfficers): Promise<{message: "extracted rejected"}> {
    let extract:IPoliceExtract = await PoliceExtractEntity.findOne({where: {id}})
    if(extract.status != "approved"){
      await PoliceExtractEntity.createQueryBuilder()
        .update(PoliceExtractEntity)
        .set({status: "rejected"})
        .where("id = :id", {id})
        .execute()
       return {message: "extracted rejected"}
    }
    throw new HttpException(400, "cannot reject extract after it has been approved")
  }

}


