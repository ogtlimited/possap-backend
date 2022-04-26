import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import OfficersRoute from './routes/officers.route';
import HelperRoute from './routes/helper.routes';
import PoliceExtractRoute from '@routes/police.extract.route';
import InvoiceRoute from "@routes/invoice.route";

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new OfficersRoute(),
  new HelperRoute(),
  new PoliceExtractRoute(),
  new InvoiceRoute()
]);

app.listen();
