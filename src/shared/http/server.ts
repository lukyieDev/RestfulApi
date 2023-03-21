import 'reflect-metadata'
import 'express-async-errors';
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import routes from './routes'
import appError from "../errors/appError";
import '../typeorm/index';
import uploadConfig from '../../config/upload'

const app = express();


app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof appError) {
        return response.status(error.statusCode).json({
            status: 'Error',
            message: error.message,
        })
    }
    return response.status(500).json({
        status: 'Error',
        message: error
    })
})

app.listen(3003, () => {
    console.log('Server Deploy 🚀')
})