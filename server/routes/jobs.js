import express from "express"
import { v4 as uuidv4 } from 'uuid';


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
//updated each object to include a unique id
    const jobWithId = { id: uuidv4(), ...newJobs }; 
//saved the new jobs by adding it into the jobs array 
    jobs.push(jobWithId)
//Respond with a 201 status code (Created) and sent back a message confirming the data was added 
    res.status(201).json({
        message:"Job added Successfully",
        job:jobWithId
    })
})

//Update the jobs array 
jobsRouter.put('/:id', (req,res)=>{
// get the jobs id from the request paramter
    const usersJobId = req.params.id;
//find the exact id in the job array
let foundJob = jobs.find(job=> job.id === usersJobId)

console.log("Users id input",usersJobId)
console.log("Found id",foundJob)

//see what new/updated data the user/client is sending through the body
const updatedJobData = req.body;

//update the job database with new updated data from the req.body
 foundJob.status = updatedJobData.status


res.status(200).send('id found')



})

