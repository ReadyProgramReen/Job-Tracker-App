import express from "express"

export const jobsRouter = express.Router()

//for all saved jobs
const jobs = []

//Load the /jobs root path 
jobsRouter.get('/',(req,res)=>{
    //display the entire job array
    res.json(jobs)
})

//creating a route to add a job
jobsRouter.post('/',(req,res)=>{  
// Access the job data sent in the request body
    const newJobs = req.body
    console.log(newJobs)  
//saved the new jobs by adding it into the jobs array 
    jobs.push(newJobs)
//Respond with a 201 status code (Created) and sent back a message confirming the data was added 
    res.status(201).json({
        message:"Job added Successfully",
        job:newJobs
    })
})

