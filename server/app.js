import dotenv from "dotenv"
dotenv.config(); //needs to be before the express 

import express from "express"
import cors from "cors"

import {jobsRouter}  from "./routes/jobs.js"

const app = express()

//cross origin resource sharing 
app.use(cors())
//parse req.body data 
app.use(express.json());


const PORT = process.env.PORT

//Jobs router 
app.use('/jobs', jobsRouter)

//tester route
app.get('/',(req,res)=>{
    res.send('Server is running and taking request !! ')
})


app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})


