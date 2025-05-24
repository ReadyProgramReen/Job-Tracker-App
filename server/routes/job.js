import express from "express"

export const jobsRouter = express.Router()

jobsRouter.get('/',(req,res)=>{
    res.send('Job route connected')
})

//creating a route to add a job
jobsRouter.post('/',(req,res)=>{
    
// Access the job data sent in the request body
    const userData = req.body
    console.log(userData)

//Respond with a 201 status code (Created) and sent back a message confirming the data was added 
    res.status(201).json({
        message:"Job added Successfully",
        job:userData
    })
})