import 'dotenv/config';
import '@/index';
import App from '@/app';
import IndexRoute from '@routes/index.route';

import validateEnv from '@utils/validateEnv';

import HelperRoute from './routes/helper.routes';

import CBSRoute from './routes/cbs.route';

validateEnv();

const app = new App([new IndexRoute(), new HelperRoute(), new CBSRoute()]);
app.listen();
