import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors'
import {createPost} from './controllers/posts.js'
import {connectDataBase} from "./config/database.js";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { verifyToken } from './middleware/auth.js';

dotenv.config({ path: "api/config/config.env" });
const app = express();
const __dirname = path.resolve();
// middlewares
app.use(express.json());
// app.use(helmet());
app.use(cookieParser());
// app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(bodyParser.json({limit:"30mb",extended : true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended : true}))
app.use(cors({origin:'*'}))



app.post('/api/posts', verifyToken, createPost);
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
// database connection
mongoose.set("strictQuery", true);
connectDataBase();

const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
// Server runnig 
const server = app.listen(PORT, () => {
    console.log(`Server is starting on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

