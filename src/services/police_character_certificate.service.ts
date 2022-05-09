import {
  IPoliceCharacterCertificate,
  IPoliceCharacterCertificateService
} from "@interfaces/police_character_cert.interface";
import {User} from '@interfaces/users.interface';
import {PoliceCharacterCertificateEntity} from "@entities/police-charater-certificate.entity";
import {Entity} from 'typeorm';
import {IOfficers} from '@interfaces/officer.interface';
import {CreatePoliceCharacterCertificateDTO} from "@dtos/police-character-certificate.dto";
import {InvoiceEntity} from "@entities/invoice.entity";
import {HttpException} from "@exceptions/HttpException";
import {PoliceExtractEntity} from "@entities/police_extract.entity";

@Entity()
export class PoliceCharacterCertificateService implements IPoliceCharacterCertificateService{

  async createUserPoliceCharacterCertificate(user: any, payload: CreatePoliceCharacterCertificateDTO): Promise<IPoliceCharacterCertificate> {
    const {id} = user
    payload.userId = id
    return await PoliceCharacterCertificateEntity.create(payload).save();
  }

  async getOfficerPoliceCharacterCertificateRecords(officer: IOfficers): Promise<IPoliceCharacterCertificate[]> {
    const approvalLevel = this.getOfficerApprovalLevel(officer.characterCertApprovalLevel)
    return await PoliceCharacterCertificateEntity.find({
      where: { approval_level: approvalLevel, police_command: officer.officerSubSection, status: 'pending' },
    });
  }

  async getPoliceCharacterCertificateRecord(id: string): Promise<IPoliceCharacterCertificate> {
    return await PoliceCharacterCertificateEntity.findOne({ where: { id } });
  }

  async getUserPoliceCharacterCertificateRecords(user: User): Promise<IPoliceCharacterCertificate[]> {
    return await PoliceCharacterCertificateEntity.find({ where: { userId: user.id } });
  }

  async approvePoliceCharacterCertificateRecords(id: string, officer: IOfficers): Promise<{ message: "certificate approved successfully" }> {
    const invoice = await InvoiceEntity.findOne({where: {application_id: id}})
    if(!invoice){
      throw new HttpException(403, "cannot approve unpaid extract")
    }
    const characterCertificate: IPoliceCharacterCertificate = await PoliceCharacterCertificateEntity.findOne({ where: { id } });
    if (officer.characterCertApprovalLevel.firstCCApproval && characterCertificate.status != 'rejected') {
      await PoliceCharacterCertificateEntity.createQueryBuilder().update(PoliceCharacterCertificateEntity).set({ approval_level: 2 }).where('id = :id', { id }).execute();
      return {  message: "certificate approved successfully"  };
    }
    else if (officer.characterCertApprovalLevel.secondCCApproval && characterCertificate.status != 'rejected'){
      await PoliceCharacterCertificateEntity.createQueryBuilder().update(PoliceCharacterCertificateEntity).set({ approval_level: 3 }).where('id = :id', { id }).execute();
      return {  message: "certificate approved successfully"  };
    }
    else if (officer.characterCertApprovalLevel.thirdCCApproval && characterCertificate.status != 'rejected'){
      await PoliceCharacterCertificateEntity.createQueryBuilder().update(PoliceCharacterCertificateEntity).set({ approval_level: 4 }).where('id = :id', { id }).execute();
      return {  message: "certificate approved successfully"  };
    }
    else if (officer.characterCertApprovalLevel.fourthCCApproval && characterCertificate.status != 'rejected'){
      await PoliceCharacterCertificateEntity.createQueryBuilder().update(PoliceCharacterCertificateEntity).set({ approval_level: 5 }).where('id = :id', { id }).execute();
      return {  message: "certificate approved successfully"  };
    }
    else if (officer.characterCertApprovalLevel.fifthCCApproval && characterCertificate.status != 'rejected'){
      await PoliceCharacterCertificateEntity.createQueryBuilder().update(PoliceCharacterCertificateEntity).set({ status: "approved" }).where('id = :id', { id }).execute();
      return {  message: "certificate approved successfully"  };
    }
    else {
      throw new HttpException(403, "access denied!")
    }
  }

  async rejectPoliceCharacterCertificateRecords(id: string, officer: IOfficers, reason:string): Promise<{ message: "certificate rejected successfully" }> {
    const record: IPoliceCharacterCertificate = await PoliceCharacterCertificateEntity.findOne({ where: { id } });
    if (record.status != 'approved') {
      await PoliceCharacterCertificateEntity.createQueryBuilder().update(PoliceCharacterCertificateEntity).set({ status: 'rejected' }).where('id = :id', { id }).execute();
      return { message: "certificate rejected successfully" };
    }
    throw new HttpException(400, 'cannot reject extract after it has been approved');
  }

  private getOfficerApprovalLevel(approvalLevel){
    if(approvalLevel.firstCCApproval){
      return 1
    }else if(approvalLevel.secondCCApproval){
      return 2
    }
    else if(approvalLevel.thirdCCApproval){
      return 3
    }
    else if(approvalLevel.fourthCCApproval){
      return 4
    }
    else {
      return 5
    }
  }

}