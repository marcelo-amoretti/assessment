'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import todoRouter from './todo/route';
import { Config } from './config/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(todoRouter);

app.listen(Config.port, () => {
  console.log(`Express server running on port ${Config.port}`);
});
