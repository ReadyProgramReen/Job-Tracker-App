import { useState,useEffect } from "react";


function App() {

  //job data
  const [jobs,setJobs] = useState([])


  
//on page load : fetch the jobs data from the server
useEffect(()=>{
  fetch(`http://localhost:8000/jobs`)
  .then(res=>res.json())
  .then(data=>{
    setJobs(data)
    console.log('Jobs', jobs)
    console.log("Jobs Data:",data)})
  .catch(err => console.log("Error fetching jobs:",err))
},[])

//the entire list of jobs 
  const listOfJobs = jobs.map(eachJob=>(
    <ul key={eachJob.id}>
        <li><h3>{eachJob.company}</h3></li>
        <li><p>{eachJob.title}</p></li>
        <li><p>{eachJob.status}</p></li>
        <li><p>{eachJob.date}</p></li>
    </ul>
  ))


  return (
    <div>
      <h1>Job Tracker</h1>
      
      {/* display all the jobs in the UI*/}
    <div>{listOfJobs}</div>
    </div>
  )
}

export default App;
