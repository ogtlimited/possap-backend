import { NextFunction, Request, Response } from 'express';
import {CreateInvoiceDTO} from "@dtos/invoice.dto";
import {IInvoice} from "@interfaces/invoice.interface";
import InvoiceService from "@services/invoice.service";

class InvoiceController {
  public invoiceService = new InvoiceService();

  public findAllUserInvoices = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IInvoice[] = await this.invoiceService.findAllUserInvoices(req.user, req.query);
      res.status(200).json({ data: result});
    } catch (error) {
      next(error);
    }
  };

  public findAllInvoices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IInvoice[] = await this.invoiceService.findAllInvoices(req.query);
      res.status(200).json({ data: result});
    } catch (error) {
      next(error);
    }
  };

  public createInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreateInvoiceDTO = req.body;
      const result = await this.invoiceService.createInvoice(payload);
      res.status(201).json({ data: result});
    } catch (error) {
      next(error);
    }
  };

  public getInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.invoiceService.getInvoice(req.params.id);
      res.status(201).json({ data: result});
    } catch (error) {
      next(error);
    }
  };

}

export default InvoiceController;
