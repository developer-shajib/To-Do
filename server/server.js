import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { mongoDBConnect } from './config/db.js';
import corsOptions from './config/cors.js';
import authRouter from './routes/auth.js';
import projectRouter from './routes/project.js';
import taskRouter from './routes/task.js';

// initialization
const app = express();
dotenv.config();

const PORT = process.env.PORT || 9090;

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors()
  // corsOptions
);
app.use(cookieParser());

// Static folder
app.use(express.static('public'));

// routing
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/task', taskRouter);

// use error handler
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
