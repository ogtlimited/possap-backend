import { updateInvoiceDTO } from './../dtos/invoice.dto';
import { Entity, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { CreateInvoiceDTO } from '@dtos/invoice.dto';
import { InvoiceEntity } from '@entities/invoice.entity';
import { IInvoice } from '@interfaces/invoice.interface';
import { v4 as uuidv4 } from 'uuid';
import PossapSFService from './possap-sf.service';

//factor pagination
@Entity()
class InvoiceService extends Repository<InvoiceEntity> {
  public async findAllUserInvoices(user, queryParams): Promise<IInvoice[]> {
    queryParams.userId = user.id;
    const invoices: IInvoice[] = await InvoiceEntity.find(queryParams);
    return invoices;
  }

  public async findAllInvoices(queryParams): Promise<IInvoice[]> {
    const invoices: IInvoice[] = await InvoiceEntity.find(queryParams);
    return invoices;
  }

  public async getInvoice(id): Promise<IInvoice> {
    const invoice: IInvoice = await InvoiceEntity.findOne({ where: { id: id } });
    return invoice;
  }
  public async updateInvoice(id, status): Promise<IInvoice> {
    const invoice: IInvoice = await InvoiceEntity.findOne({ where: { id: id } });
    if (!invoice) throw new HttpException(404, 'invoice not found');
    await InvoiceEntity.update(id, status);
    const update: IInvoice = await InvoiceEntity.findOne({ where: { id: id } });

    return update;
  }

  public async createInvoice(payload: CreateInvoiceDTO): Promise<IInvoice> {
    const newInvoice: IInvoice = payload;
    newInvoice.id = await uuidv4(6);
    const createInvoiceData = await InvoiceEntity.create(newInvoice).save();
    return createInvoiceData;
  }
}

export default InvoiceService;
