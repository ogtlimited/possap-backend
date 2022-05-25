import { IPoliceExtract, IPoliceExtractService } from '@interfaces/police_extract.interface';
import { User } from '@interfaces/users.interface';
import { PoliceExtractEntity } from '@entities/police_extract.entity';
import { Entity } from 'typeorm';
import { IOfficers } from '@interfaces/officer.interface';
import { HttpException } from '@exceptions/HttpException';
import {InvoiceEntity} from "@entities/invoice.entity";
import InvoiceService from "@services/invoice.service";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class PoliceExtractService implements IPoliceExtractService {

  private invoiceService = new InvoiceService;
  async createExtract(user: any, payload: IPoliceExtract): Promise<IPoliceExtract> {
    const { id } = user;
    payload.user = id;
    const uuid = await uuidv4(6).split("-")[0]
    payload.id = `EXT${uuid}`
    const createPoliceExtract: IPoliceExtract = await PoliceExtractEntity.create(payload).save();
    const serviceInvoice = await this.invoiceService.createInvoice({
      amount: 1000,
      application_id: createPoliceExtract.id,
      service_id: "1",
      userId: id
    })
    return {createPoliceExtract, serviceInvoice};
  }

  async getApplicantsExtracts(user: User): Promise<IPoliceExtract[]> {
    return await PoliceExtractEntity.find({ where: { user: user.id }, relations: ["user"] });
  }

  async getOfficerExtracts(officer: IOfficers): Promise<IPoliceExtract[]> {
    const approvalLevel = officer.extractApprovalLevel.extractFirstApproval ? 1 : 2;
    return await PoliceExtractEntity.find({
      where: { approvalLevel: approvalLevel, extractPoliceDivision: officer.officerSection, status: 'pending' },
      relations: ['user'],
    });
  }

  async getExtract(id: number): Promise<IPoliceExtract> {
    return await PoliceExtractEntity.findOne({ where: { id } });
  }

  // middleware should check if officer is allowed to approve.
  async approveExtract(id: number, officer: IOfficers): Promise<{ message: 'extracted approved' }> {
    const extractInvoice = await InvoiceEntity.findOne({where: {application_id: id}})
    if(!extractInvoice){
      throw new HttpException(403, "cannot approve unpaid extract")
    }
    const extract: IPoliceExtract = await PoliceExtractEntity.findOne({ where: { id } });
    if (officer.extractApprovalLevel.extractFirstApproval && extract.status != 'rejected') {
      await PoliceExtractEntity.createQueryBuilder().update(PoliceExtractEntity).set({ approvalLevel: 2 }).where('id = :id', { id }).execute();
      return { message: 'extracted approved' };
    } else {
      await PoliceExtractEntity.createQueryBuilder().update(PoliceExtractEntity).set({ status: 'approved' }).where('id = :id', { id }).execute();
      return { message: 'extracted approved' };
    }
  }

  // middleware should check if officer is allowed to approve.
  async rejectExtract(id: number, officer: IOfficers): Promise<{ message: 'extracted rejected' }> {
    const extract: IPoliceExtract = await PoliceExtractEntity.findOne({ where: { id } });
    if (extract.status != 'approved') {
      await PoliceExtractEntity.createQueryBuilder().update(PoliceExtractEntity).set({ status: 'rejected' }).where('id = :id', { id }).execute();
      return { message: 'extracted rejected' };
    }
    throw new HttpException(400, 'cannot reject extract after it has been approved');
  }
}
