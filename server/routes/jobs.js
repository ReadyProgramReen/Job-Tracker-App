import express from "express"
import { v4 as uuidv4 } from 'uuid';


export const jobsRouter = express.Router()

//for all saved jobs
let jobs = []

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
// if(updatedJobData.company){
//     foundJob.company = updatedJobData.company
// }
// if(updatedJobData.title){
//     foundJob.title = updatedJobData.title

// }
// if(updatedJobData.status){
//     foundJob.status = updatedJobData.status

// }
// if(updatedJobData.date){
//     foundJob.date = updatedJobData.date
// }

//Make an array of fields you allow updates for 
let updatedArray = ['company', 'title', 'status', 'date', 'notes']

//loop through the array to check if the req.body has anything to update 
updatedArray.forEach(update=>{
    if(updatedJobData[update]){
        foundJob[update] = updatedJobData[update]
    }
})
res.status(200).json({message: "Job id updated"})
})


//DELETE REQUEST
jobsRouter.delete('/:id',(req,res)=>{
    //store the root parmas in a variable 
    const usersJobId = req.params.id
    
    //find the id in the job array and delete it(remember: filter creates a new array and doesnt change the existing one)
    jobs = jobs.filter(job=> job.id !== usersJobId )

    //send back a status code that everything went well
    res.status(200).json({message: "Job Deleted"})

})


