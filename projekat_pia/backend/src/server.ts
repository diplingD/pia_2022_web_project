import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
//import fileUpload from 'express-fileupload';

const app = express();
app.use(cors());
app.use(express.json());
//app.use(fileUpload());

mongoose.connect('mongodb://127.0.0.1:27017/projekat2023')
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);   //za sve rute koje u sebi imaju 'clientP' ja cu da koristim userRouter

app.use('/', router);   // svi zahtevi koji dodju obradjivace ruter
app.listen(4000, () => console.log(`Express server running on port 4000`));