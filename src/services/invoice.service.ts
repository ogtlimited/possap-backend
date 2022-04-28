import { EntityRepository, getRepository, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import {CreateInvoiceDTO} from "@dtos/invoice.dto";
import {InvoiceEntity} from "@entities/invoice.entity";
import {IInvoice} from "@interfaces/invoice.interface";
import { v4 as uuidv4 } from 'uuid';

//factor pagination
@EntityRepository()
class InvoiceService extends Repository<InvoiceEntity> {
  public async findAllUserInvoices(user, queryParams): Promise<IInvoice[]> {
    queryParams.userId = user.id
    const invoices: IInvoice[] = await getRepository(InvoiceEntity).find(queryParams)
    return invoices;
  }

  public async findAllInvoices(queryParams): Promise<IInvoice[]> {
    const invoices: IInvoice[] = await getRepository(InvoiceEntity).find(queryParams)
    return invoices;
  }

  public async getInvoice(id): Promise<IInvoice> {
    const invoice: IInvoice = await getRepository(InvoiceEntity).findOne({where: {id: id}})
    return invoice;
  }

  public async createInvoice(payload: CreateInvoiceDTO): Promise<any> {

    const newInvoice: IInvoice = payload
    newInvoice.id = await uuidv4(6)
    const createInvoiceData = await InvoiceEntity.create(newInvoice).save();
    return createInvoiceData;
  }

}

export default InvoiceService;
