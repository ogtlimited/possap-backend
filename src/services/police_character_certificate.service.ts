import {
  IPoliceCharacterApprover,
  IPoliceCharacterCertificate,
  IPoliceCharacterCertificateService,
} from '@interfaces/police_character_cert.interface';
import { User } from '@interfaces/users.interface';
import { PoliceCharacterCertificateEntity } from '@entities/police-charater-certificate.entity';
import { Entity } from 'typeorm';
import { IOfficers } from '@interfaces/officer.interface';
import { CreatePoliceCharacterCertificateDTO, UpdatePoliceCharacterCertificateDTO } from '@dtos/police-character-certificate.dto';
import { InvoiceEntity } from '@entities/invoice.entity';
import { HttpException } from '@exceptions/HttpException';
import { v4 as uuidv4 } from 'uuid';
import InvoiceService from '@services/invoice.service';

@Entity()
export class PoliceCharacterCertificateService implements IPoliceCharacterCertificateService {
  private invoiceService = new InvoiceService();

  async createUserPoliceCharacterCertificate(user: any, payload: IPoliceCharacterCertificate): Promise<IPoliceCharacterCertificate> {
    const { id } = user;
    payload.user = id;
    const uuid = await uuidv4(6).split('-')[0];
    payload.id = `PCC${uuid}`;
    const createPoliceCertificate = await PoliceCharacterCertificateEntity.create(payload).save();
    const serviceInvoice = await this.invoiceService.createInvoice({
      amount: 1000,
      application_id: createPoliceCertificate.id,
      service_id: '2',
      userId: id,
    });
    return { createPoliceCertificate, serviceInvoice };
  }

  async getOfficerPoliceCharacterCertificateRecords(officer: IOfficers): Promise<IPoliceCharacterCertificate[]> {
    const approvalLevel = PoliceCharacterCertificateService.getOfficerApprovalLevel(officer.characterCertApprovalLevel);
    return await PoliceCharacterCertificateEntity.find({
      where: { approvalLevel: approvalLevel, certificateRequestCommand: officer.officerSection, status: 'pending' },
      relations: ['user'],
    });
  }

  async getPoliceCharacterCertificateRecord(id: string, userId, userType): Promise<IPoliceCharacterCertificate> {
    let record;
    if (userType != 'officer') {
      record = await PoliceCharacterCertificateEntity.findOne({ where: { id, user: userId } });
    }
    record = await PoliceCharacterCertificateEntity.findOne({ where: { id } });
    return record;
  }

  async getUserPoliceCharacterCertificateRecords(user: User): Promise<IPoliceCharacterCertificate[]> {
    return await PoliceCharacterCertificateEntity.find({ where: { user: user.id } });
  }

  async approvePoliceCharacterCertificateRecords(
    id: string,
    payload: UpdatePoliceCharacterCertificateDTO,
    officer: IOfficers,
  ): Promise<{ message: 'certificate approved successfully' }> {
    const invoice = await InvoiceEntity.findOne({ where: { application_id: id } });
    if (!invoice) {
      throw new HttpException(403, 'cannot approve unpaid extract');
    }
    const approverInfoSubProperties = {
      comment: payload.comment,
      date: new Date().toISOString().split('T')[0],
      approved: true,
      officerId: officer.id,
    };
    const characterCertificate: IPoliceCharacterCertificate = await PoliceCharacterCertificateEntity.findOne({ where: { id } });
    if (officer.characterCertApprovalLevel.firstCCApproval && characterCertificate.status != 'rejected') {
      await PoliceCharacterCertificateService.approveHelper(id, 2, { approver1: approverInfoSubProperties });
      return { message: 'certificate approved successfully' };
    } else if (officer.characterCertApprovalLevel.secondCCApproval && characterCertificate.status != 'rejected') {
      await PoliceCharacterCertificateService.approveHelper(id, 3, { approver2: approverInfoSubProperties });
      return { message: 'certificate approved successfully' };
    } else if (officer.characterCertApprovalLevel.thirdCCApproval && characterCertificate.status != 'rejected') {
      await PoliceCharacterCertificateService.approveHelper(id, 4, { approver3: approverInfoSubProperties });
      return { message: 'certificate approved successfully' };
    } else if (officer.characterCertApprovalLevel.fourthCCApproval && characterCertificate.status != 'rejected') {
      await PoliceCharacterCertificateService.approveHelper(id, 5, { approver4: approverInfoSubProperties });
      return { message: 'certificate approved successfully' };
    } else if (officer.characterCertApprovalLevel.fifthCCApproval && characterCertificate.status != 'rejected') {
      await PoliceCharacterCertificateService.approveHelper(id, 6, { approver5: approverInfoSubProperties });
      return { message: 'certificate approved successfully' };
    } else if (officer.characterCertApprovalLevel.secretariatRouting && characterCertificate.status != 'rejected') {
      await PoliceCharacterCertificateService.finalApproveHelper(id, { approver5: approverInfoSubProperties });
      return { message: 'certificate approved successfully' };
    } else {
      throw new HttpException(403, 'access denied!');
    }
  }

  private static async approveHelper(id, approvalLevel: number, approvalInfo: IPoliceCharacterApprover) {
    await PoliceCharacterCertificateEntity.createQueryBuilder()
      .update(PoliceCharacterCertificateEntity)
      .set({ approvalLevel: approvalLevel, approvalInfo })
      .where('id = :id', { id })
      .execute();
  }

  private static async finalApproveHelper(id, approvalInfo: IPoliceCharacterApprover) {
    await PoliceCharacterCertificateEntity.createQueryBuilder()
      .update(PoliceCharacterCertificateEntity)
      .set({ status: 'approved', approvalInfo })
      .where('id = :id', { id })
      .execute();
  }

  private static async rejectApprovalHelper(id, approvalInfo: IPoliceCharacterApprover) {
    await PoliceCharacterCertificateEntity.createQueryBuilder()
      .update(PoliceCharacterCertificateEntity)
      .set({ status: 'rejected', approvalInfo })
      .where('id = :id', { id })
      .execute();
  }

  async rejectPoliceCharacterCertificateRecords(
    id: string,
    officer: IOfficers,
    payload: UpdatePoliceCharacterCertificateDTO,
  ): Promise<{ message: 'certificate rejected successfully' }> {
    const characterCertificate: IPoliceCharacterCertificate = await PoliceCharacterCertificateEntity.findOne({ where: { id } });
    const approverInfoSubProperties = {
      comment: payload.comment,
      date: new Date().toISOString().split('T')[0],
      approved: false,
      officerId: officer.id,
    };
    if (characterCertificate.status != 'approved') {
      if (officer.characterCertApprovalLevel.firstCCApproval && characterCertificate.status != 'rejected') {
        await PoliceCharacterCertificateService.approveHelper(id, 2, { approver1: approverInfoSubProperties });
        return { message: 'certificate rejected successfully' };
      } else if (officer.characterCertApprovalLevel.secondCCApproval && characterCertificate.status != 'rejected') {
        await PoliceCharacterCertificateService.approveHelper(id, 3, { approver2: approverInfoSubProperties });
        return { message: 'certificate rejected successfully' };
      } else if (officer.characterCertApprovalLevel.thirdCCApproval && characterCertificate.status != 'rejected') {
        await PoliceCharacterCertificateService.approveHelper(id, 4, { approver3: approverInfoSubProperties });
        return { message: 'certificate rejected successfully' };
      } else if (officer.characterCertApprovalLevel.fourthCCApproval && characterCertificate.status != 'rejected') {
        await PoliceCharacterCertificateService.approveHelper(id, 5, { approver4: approverInfoSubProperties });
        return { message: 'certificate rejected successfully' };
      } else if (officer.characterCertApprovalLevel.fifthCCApproval && characterCertificate.status != 'rejected') {
        await PoliceCharacterCertificateService.approveHelper(id, 6, { approver5: approverInfoSubProperties });
        return { message: 'certificate rejected successfully' };
      } else if (officer.characterCertApprovalLevel.secretariatRouting && characterCertificate.status != 'rejected') {
        await PoliceCharacterCertificateService.finalApproveHelper(id, { approver5: approverInfoSubProperties });
        return { message: 'certificate rejected successfully' };
      } else {
        throw new HttpException(403, 'access denied!');
      }
    }
    throw new HttpException(400, 'cannot reject extract after it has been approved');
  }

  private static getOfficerApprovalLevel(approvalLevel) {
    if (approvalLevel.firstCCApproval) {
      return 1;
    } else if (approvalLevel.secondCCApproval) {
      return 2;
    } else if (approvalLevel.thirdCCApproval) {
      return 3;
    } else if (approvalLevel.fourthCCApproval) {
      return 4;
    } else if (approvalLevel.fifthCCApproval) {
      return 5;
    } else {
      return 6;
    }
  }
}
