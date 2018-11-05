'use strict'
import express from 'express';
import mongoDB from './server/mongo_db';
import { Routes } from './server/routes';
import cors from 'cors';


const PORT = process.env.PORT || 9000;
const app = express();

app.use(cors());

// Apllication level api's
Routes.call(app);


// listen the app with given port
app.listen(PORT, () => console.log("Server is started with the port ", PORT));
