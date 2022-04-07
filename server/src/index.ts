require('dotenv').config();

import Server from './server';
const app = new Server();

app.listen();