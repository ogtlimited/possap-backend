import { isEmpty } from './../utils/util';
import { IIncident } from './../interfaces/incident.interface';
import { Entity, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { IncidentEntity } from '@entities/Incident.entity';
import { v4 as uuidv4 } from 'uuid';

//factor pagination
@Entity()
class IncidentService extends Repository<IncidentEntity> {
  public async findAllIncidents(queryParams): Promise<IIncident[]> {
    const Incidents: IIncident[] = await IncidentEntity.find(queryParams);
    return Incidents;
  }

  public async getIncident(id): Promise<IIncident> {
    const Incident: IIncident = await IncidentEntity.findOne({ where: { id: id } });
    return Incident;
  }
  public async updateIncident(id, data): Promise<IIncident> {
    const Incident: IIncident = await IncidentEntity.findOne({ where: { id: id } });
    if (!Incident) throw new HttpException(404, 'Incident not found');
    await IncidentEntity.update(id, data);
    const update: IIncident = await IncidentEntity.findOne({ where: { id: id } });

    return update;
  }

  public async createIncident(payload): Promise<IIncident> {
    const newIncident: IIncident = payload;
    const createIncidentData = await IncidentEntity.create(newIncident).save();
    return createIncidentData;
  }

  public async deleteIncident(incidentId: string): Promise<IIncident> {
    if (isEmpty(incidentId)) throw new HttpException(400, "You're not incidentId");

    const incident: IIncident = await IncidentEntity.findOne({ where: { id: incidentId } });
    if (!incident) throw new HttpException(409, 'incident not found');

    await IncidentEntity.delete({ id: incidentId });
    return incident;
  }
}

export default IncidentService;
