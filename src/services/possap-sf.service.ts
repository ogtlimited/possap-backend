import { IApprovalLog } from './../interfaces/possap-services.interfact';
/* eslint-disable @typescript-eslint/no-empty-function */
import HelperController from '@/controllers/helper-controller/helper.controller';
import OfficerService from '@services/officers.service';
import { IPossapService } from './../interfaces/possap-services.interfact';
import { IPossapServiceFields } from '../interfaces/possap-services.interfact';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, In, Repository } from 'typeorm';
import { PossapServiceFieldsEntity } from '@entities/service-field.entity';
import { ObjectId } from '@/utils/util';
import PossapService from './possap-services.service';
import { IOfficers } from './../interfaces/officer.interface';
import { OfficerEntity } from '@entities/officers.entity';
import { InvoiceEntity } from '@/entities/invoice.entity';
import InvoiceService from './invoice.service';
import { threadId } from 'worker_threads';

@EntityRepository()
class PossapSFService extends Repository<PossapServiceFieldsEntity> {
  public possapS = new PossapService();
  public helperC = new HelperController();
  public invoiceS = new InvoiceService();
  public officerS = new OfficerService();
  public async findPossapSF(): Promise<IPossapServiceFields[]> {
    const AllPossaps: IPossapServiceFields[] = await PossapServiceFieldsEntity.find();
    console.log(AllPossaps);
    return AllPossaps;
  }

  public async findAPossapSFById(AllPossapId: any): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapId)) throw new HttpException(400, "You're not AllPossapId");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    return findAllPossap;
  }

  public async createPossapSF(data): Promise<any> {
    try {
      if (isEmpty(data)) throw new HttpException(400, 'Data is empty');
      console.log('service id', data.service);
      const parent: IPossapService = await this.possapS.findPossapServiceById(data.service);
      const ref = parent?.slug.toUpperCase() + '-' + ObjectId();
      const processor = await this.distributor(parent, data);
      console.log(processor, 'processor');
      if (parent && processor) {
        const { amount, ...others } = data;
        const obj = {
          ...others,
          ref,
          processor: processor,
          approvalLevel: parent.approvalWorkFlow[0],
        };
        const createAllPossapData = await PossapServiceFieldsEntity.save(obj);
        const genInvoice = await this.invoiceS.createInvoice({
          amount: amount,
          applicationId: createAllPossapData.id,
          serviceId: parent.id,
          userId: data.owner,
          status: 'pending',
        });
        return { createAllPossapData, genInvoice };
      } else {
        throw new HttpException(409, 'Parent service does not exist');
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(400, error);
    }
  }

  public async distributor(parent: IPossapService, data) {
    let processed = null;
    switch (parent.slug.toLowerCase()) {
      case 'cmr':
        processed = this.cmrProcessessor(data);
        break;
      case 'egs':
        processed = this.egsProcessessor(data);
        break;
      case 'pcc':
        processed = this.pccProcessessor(data);
        break;
      case 'pe':
        processed = this.peProcessessor(data);
        break;
      default:
        console.log('slug is not found');
        break;
    }
    console.log('processed', processed);
    return processed;
  }

  public async cmrProcessessor(data) {
    return '1-17-92';
  }
  public async peProcessessor(data) {
    const { extractState, extractPoliceDivision } = data.formFields[0];
    console.log(extractState, extractPoliceDivision);
    const stateCode = this.helperC.getState(extractState);
    const divisionCode = this.helperC.getStateDivision(stateCode, extractPoliceDivision);
    return 3 + '-' + divisionCode.command + '-' + divisionCode.division.Code;
  }
  public async egsProcessessor(data) {}
  public async pccProcessessor(data) {
    const { requestState, requestStateCID } = data.formFields[0];
    const stateCode = this.helperC.getState(requestState);
    const stateCID = this.helperC.getStateCID(stateCode, requestStateCID);
    console.log(stateCode, 'statecode');
    console.log(stateCID, 'statecode');
    return 3 + '-' + stateCID.command + '-' + stateCID?.division.Code;
  }

  public async officerRequest(officerId: string) {
    const officer: IOfficers = await OfficerEntity.findOne({ where: { id: officerId } });
    if (officer) {
      // get officer services
      const services = officer.access.services;
      // officer formation, department section and subsection
      const access = this.mapOfficerAccess(officer.profile); // '1-17-92'
      // console.log(officer);
      // console.log(access);
      const commandAccess = officer.commandAccessIds.map(ac => this.mapOfficerAccess(ac)); // ['3-32-76']
      // console.log(commandAccess);
      const fullAccess = [access, ...commandAccess];
      console.log(fullAccess, services);
      const reqList = await PossapServiceFieldsEntity.find({ where: { service: { id: In([...services]) }, processor: In(fullAccess) } });
      console.log(reqList, 'reqList');
      // const reqList = await PossapServiceFieldsEntity.find({ where: { approvalLevel: In(officer.canApprove) } });
      return reqList;
    }
  }

  async approveRequest(id: number, officerId: number, approvalInfo: IApprovalLog): Promise<{ message: 'request approved' }> {
    // check invoice
    const serviceInvoice = await InvoiceEntity.findOne({ where: { application_id: id } });
    if (!serviceInvoice) {
      throw new HttpException(403, 'cannot approve unpaid request');
    }
    // check whether request is under officer jurisdiction
    const officerDetails = await this.officerS.findOfficerById(officerId);
    const request: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id } });
    if (officerDetails) {
      const access = this.mapOfficerAccess(officerDetails.profile);
      const commandAccess = officerDetails.commandAccessIds.map(ac => this.mapOfficerAccess(ac));
      const fullAccess = [access, ...commandAccess];
      if (!fullAccess.includes(request.processor)) {
        throw new HttpException(403, 'Request cannot be approved by you');
      }
    }
    const requestParent: IPossapService = await this.possapS.findOne({ where: { id } });
    const approvalWorkFlow = requestParent.approvalWorkFlow;
    const currentApproval = request.approvalLevel;
    const nextApprovalLevel = approvalWorkFlow.findIndex(e => e === currentApproval) + 1;
    if (approvalInfo.status === 'rejected') {
      console.log('rejected');
      request.status = 'rejected';
    } else if (request.approvalLevel !== 'Completed') {
      if (approvalWorkFlow[nextApprovalLevel]) {
        request.approvalLevel = approvalWorkFlow[nextApprovalLevel];
      } else {
        request.approvalLevel = 'Completed';
      }
      if (!request.approvalLog) {
        //  approvalWorkFlow[approvalWorkFlow.length - 1]
        request.approvalLog = [approvalInfo];
      } else {
        request.approvalLog.push(approvalInfo);
      }
    }
    // const updates =
    // await this.updatePossapService(id, request);

    // if (officer.extractApprovalLevel.extractFirstApproval && request.status != 'rejected') {
    //   await PoliceExtractEntity.createQueryBuilder().update(PoliceExtractEntity).set({ approvalLevel: 2 }).where('id = :id', { id }).execute();
    //   return { message: 'extracted approved' };
    // } else {
    //   await PoliceExtractEntity.createQueryBuilder().update(PoliceExtractEntity).set({ status: 'approved' }).where('id = :id', { id }).execute();
    //   return { message: 'extracted approved' };
    // }
    return { message: 'request approved' };
  }

  public mapOfficerAccess(obj) {
    const { officerFormation, officerDepartment, officerSection, officerSubSection } = obj;
    let primary = officerFormation + '-' + officerDepartment + '-' + officerSection;
    if (officerSubSection !== '' && officerSubSection !== null) {
      primary = primary + '-' + officerSubSection;
    }
    return primary;
  }

  public async updatePossapService(AllPossapId: any, AllPossapData: any): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceFieldsEntity.update(AllPossapId, AllPossapData);

    const updateAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    return updateAllPossap;
  }
  public async updateServiceAprrover(AllPossapId: any, AllApproverData: any): Promise<IPossapService> {
    if (isEmpty(AllApproverData)) throw new HttpException(400, "You're not AllOfficerData");

    const findAllPossap: IPossapService = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, 'Request not found');

    const arr = [];
    AllApproverData.forEach(element => {
      arr.push(element.officerId);
    });

    const findAllOfficer: IOfficers[] = await OfficerEntity.find({ where: { id: In([...arr]) } });
    if (findAllOfficer.length != arr.length) throw new HttpException(409, "There's no Officer with that id");

    const updateAllAprovers: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    return updateAllAprovers;
  }

  public async deleteAllPossap(AllPossapId: number): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapId)) throw new HttpException(400, "You're not AllPossapId");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, 'Service does not exist');

    await PossapServiceFieldsEntity.delete({ id: AllPossapId });
    return findAllPossap;
  }
}

export default PossapSFService;
