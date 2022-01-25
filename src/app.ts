import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { routes } from './routes';
import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as ServiceAccount),
	databaseURL: process.env.DATABASE_URL,
})

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

export { app, admin }