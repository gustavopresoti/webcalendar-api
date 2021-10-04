import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes';

const app = express()

const mongoUser = process.env.MONGO_USER
const mongoPassword = process.env.MONGO_PASSWORD

mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@clusterwebcalendar.2zzh5.mongodb.net/webcalendar?retryWrites=true&w=majority`);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3333)
