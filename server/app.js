import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; 
import connectDB from './config/connectDB.js';
import Auth from './routes/Auth.js'


const app = express()


dotenv.config();
const PORT = process.env.PORT;


//Cors policy
app.use(cors()); 

//Connect DB
connectDB();

//Load Routes
app.use(Auth)



//JSON
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
})




