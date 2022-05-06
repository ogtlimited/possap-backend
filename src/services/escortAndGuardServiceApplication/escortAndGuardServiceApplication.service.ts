import { EntityRepository, Repository } from 'typeorm';
import { In } from 'typeorm';
import { CreateEscortAndGuardServiceDto } from '@dtos/escortAndGuardService/escortAndGuardService.dto';
import { EscortAndGuardServiceApplicationEntity } from '@entities/EscortAndGuardService/EscortAndGuardServiceApplication.entity';
import { HttpException } from '@exceptions/HttpException';
import { EscortAndGuardServiceApplication } from '@interfaces/EscortAndGuardServiceApplication/EscortAndGuardServiceApplication.interface';
import { isEmpty } from '@utils/util';
import { IOfficers } from '@interfaces/officer.interface';
@EntityRepository()
class EscortAndGuardServiceApplicationService extends Repository<EscortAndGuardServiceApplicationEntity> {
  public async findAllEAG(eagUnit: string, officer: any): Promise<EscortAndGuardServiceApplication[]> {
    let records = [];
    const tactical = officer.officerSubSection;
    const tacticalCommandAccess = officer.commandAccess.map(e => e.officerSubSection);
    const tacticalArray = [tactical, ...tacticalCommandAccess];

    const conventional = officer.officerSection;
    const conventionalCommandAccess = officer.commandAccess.map(e => e.officerSection);
    const conventionalArray = [conventional, ...conventionalCommandAccess];
    if (eagUnit.toLowerCase() === 'tactical') {
      records = await EscortAndGuardServiceApplicationEntity.find({
        where: { commandFormation: In(tacticalArray) },
      });
    } else if (eagUnit.toLowerCase() === 'all') {
    } else {
      records = await EscortAndGuardServiceApplicationEntity.find({
        where: { commandFormation: In(conventionalArray) },
      });
    }

    return records;
  }

  public async findAll(officer: any): Promise<EscortAndGuardServiceApplication[]> {
<<<<<<< HEAD
    const tactical = officer.officerSubSection;
    const tacticalCommandAccess = officer.commandAccess.map(e => e.officerSubSection);
    const tacticalArray = [tactical, ...tacticalCommandAccess];

    const conventional = officer.officerSection;
    const conventionalCommandAccess = officer.commandAccess.map(e => e.officerSection);
    const conventionalArray = [conventional, ...conventionalCommandAccess];

    const records = await EscortAndGuardServiceApplicationEntity.find({
      where: [{ commandFormation: In(conventionalArray) }, { commandFormation: In(tacticalArray) }],
    });
=======
    const tactical = officer.officerSubSection
    const tacticalCommandAccess = officer.commandAccess.map(e => e.officerSubSection)
    const tacticalArray = [tactical, ...tacticalCommandAccess]

    const conventional = officer.officerSection
    const conventionalCommandAccess = officer.commandAccess.map(e => e.officerSection)
    const conventionalArray = [conventional, ...conventionalCommandAccess]

    const records = await EscortAndGuardServiceApplicationEntity.find({
        where: [
          { commandFormation: In (conventionalArray) },
          { commandFormation: In (tacticalArray) },
        ] 
      });
>>>>>>> added find all eag

    return records;
  }

  public async findByEAGId(eagId: number): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(eagId)) throw new HttpException(400, "Id required");

    const findEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.findOne({ where: { id: eagId } });
    if (!findEAG) throw new HttpException(409, "This record was not found");

    return findEAG;
  }

  public async createEAG(payload: CreateEscortAndGuardServiceDto): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(payload)) throw new HttpException(400, "Payload required");
    const createEAG = await EscortAndGuardServiceApplicationEntity.create(payload);
    await EscortAndGuardServiceApplicationEntity.save(createEAG)
    return createEAG;
  }

  public async deleteUser(eagId: string): Promise<EscortAndGuardServiceApplication> {
    if (isEmpty(eagId)) throw new HttpException(400, 'PD required');

    const findEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.findOne({ where: { id: eagId } });
    if (!findEAG) throw new HttpException(404, 'No record found');

    await EscortAndGuardServiceApplicationEntity.delete({ id: eagId });
    return findEAG;
  }

  public async approvalFlow(officer: IOfficers, eagId: string): Promise<{ message: string, HTTP_STATUS: number }> {
    const eag = await this.findOneEag(eagId)
    const approverLevel = eag.approvalLevel
    let HAS_PERMISSION = false;
    let FINAL_APPROVAL_STAGE = false;
    let HTTP_STATUS = 200;

    switch(approverLevel) {
      case 1:
        HAS_PERMISSION = officer.eGSApprovalLevel.escortRequest1
        break;
      case 2:
        HAS_PERMISSION = officer.eGSApprovalLevel.escortRequest2
        break;
      case 3:
        HAS_PERMISSION = officer.eGSApprovalLevel.escortRequest3
        break;
      case 4:
        HAS_PERMISSION = officer.eGSApprovalLevel.escortRequest2
        FINAL_APPROVAL_STAGE = true
        break;
      default:
        HAS_PERMISSION = false
    }

    if(HAS_PERMISSION){
      let builder = await EscortAndGuardServiceApplicationEntity.createQueryBuilder()
      .where('id = :id', { eagId })
      .update(EscortAndGuardServiceApplicationEntity)
      .set({ 
        approvalLevel: approverLevel + 1,
        status: "in_progress" 
      })

      if(FINAL_APPROVAL_STAGE){
        builder.set({status: "approved"})
      }
      await builder.execute();
      return  {message: 'Updated Succesfully' , HTTP_STATUS}
    } 
    throw new HttpException(401, 'You cannot approve this request');
  }

  public async rejectEAG(
    eagId: string
  ): Promise<{ message: string }> {
    const eag = await this.findOneEag(eagId)
    if (eag.status != 'approved') {
      await EscortAndGuardServiceApplicationEntity.createQueryBuilder()
        .update(EscortAndGuardServiceApplicationEntity)
        .set({ status: 'rejected' })
        .where('id = :id', { eagId })
        .execute();
      return { message: 'request has been rejected' };
    }
    throw new HttpException(400, 'cannot reject request after it has been approved');
  }

  private async findOneEag(eagId: string): Promise<EscortAndGuardServiceApplication>{
    const findEAG: EscortAndGuardServiceApplication = await EscortAndGuardServiceApplicationEntity.findOne({ where: { id: eagId } });
    return findEAG
  }
}

export default EscortAndGuardServiceApplicationService;
