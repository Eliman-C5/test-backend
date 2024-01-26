// usar variables de entorno del .env

import { config } from 'dotenv';
config();

import http from 'http'
import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT;

const server = http.createServer(app);

function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

mongoose.connect(process.env.MONGO_URI || '')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

startServer();