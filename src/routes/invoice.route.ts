import { Router } from 'express';
import InvoiceController from "@controllers/invoice.controller";
import {CreateInvoiceDTO} from "@dtos/invoice.dto";
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from "@middlewares/auth.middleware";

class InvoiceRoute implements Routes {
  public path = '/invoices';
  public router = Router();
  public invoiceController = new InvoiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    //get user invoices
    this.router.get(`${this.path}/user/all`, [authMiddleware],  this.invoiceController.findAllUserInvoices);

    //get invoices
    this.router.get(`${this.path}`, this.invoiceController.findAllInvoices);

    //create invoice
    this.router.post(`${this.path}`,  validationMiddleware(CreateInvoiceDTO, 'body'), this.invoiceController.createInvoice);

    //get invoice
    this.router.get(`${this.path}/:id`, [authMiddleware], this.invoiceController.getInvoice);
  }
}

export default InvoiceRoute;
