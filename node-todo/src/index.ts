'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { Config } from './config/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(Config.port, () => {
  console.log(`Express server running on port ${Config.port}`);
});
