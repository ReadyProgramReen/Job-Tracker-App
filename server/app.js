import dotenv from "dotenv"
dotenv.config(); //needs to be before the express 
import express from "express"
import {jobsRouter}  from "./routes/job.js"

const app = express()
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


