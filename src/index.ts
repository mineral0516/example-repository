// index.ts

import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import commandLineLogger from 'koa-logger'

import router from './routes'

const app = new Koa();
const PORT = 3000;

app.use(cors({ credentials : true }));
app.use(commandLineLogger());
app.use(bodyParser());

app.use(router.middleware())

app.on('error', e => console.error('Error', e))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));