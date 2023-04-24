import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CBSController from '@/controllers/helper-controller/CBSController';
import multer from 'multer';
import path from 'path';

const dest = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    console.log(file);
    /* generates a "unique" name - not collision proof but unique enough for small sized applications */
    const id = Date.now();
    /* need to use the file's mimetype because the file name may not have an extension at all */
    const ext = file.mimetype.split('/')[1];
    cb(null, `${id}.${ext}`);
  },
});

const upload = multer({ storage: storage });
class CBSRoute implements Routes {
  public path = '/cbs-routes';
  public router = Router();
  public cbs = new CBSController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.cbs.postRequest);
    this.router.post(`${this.path}/upload`, upload.single('documents'), this.cbs.tempUpload);
  }
}

export default CBSRoute;
