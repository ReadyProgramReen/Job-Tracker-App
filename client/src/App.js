import { useState,useEffect } from "react";


function App() {
  //all job data state
  const [jobs,setJobs] = useState([])
  //company input state
  const [company,setCompany] = useState('')
   //Job title input state
  const [title,setTitle] = useState('')
   //Job Status input state
  const [status,setStatus] = useState('')
  //notes input state
  const [notes,setNotes] = useState('')
   //Date input  state
  const [date,setDate] = useState('')
  
//Fetches all the jobs data 
function fetchJobs() {
  fetch('http://localhost:8000/jobs')
  //converts the response back to an object
    .then(res => res.json())
    //re assigns the jobs states with the data from the fetch
    .then(data => setJobs(data))
    //catches the error 
    .catch(err => console.error('Error fetching jobs:', err));
}

//on page load : fetch the jobs data from the server
useEffect(()=>{
  fetchJobs()
},[])

//the entire list of jobs 
  const listOfJobs = jobs.map(eachJob=>(
    <ul key={eachJob.id}>
        <li><h3>{eachJob.company}</h3></li>
        <li><p>{eachJob.title}</p></li>
        <li><p>{eachJob.status}</p></li>
        <li><p>{eachJob.notes}</p></li>
        <li><p>{eachJob.date}</p></li>
    </ul>
  ))

  // when client submits a form : implement a fetch PUT request
  function handleFormSubmit(e){
  // stops browser from reloading 
    e.preventDefault()
      console.log("handleFormSubmit")
    
      //POST fetch request
      fetch(`http://localhost:8000/jobs`,{
        method: "POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
          company: company,
          title: title,
          status: status,
          date: date,
          notes:notes
        })
      })
      // once POST Fetch is successful:
      .then(()=> {
        //re-fetch the full list so the screen updates
        fetchJobs();
        // clear the form input field using the set Value States
        setCompany('') ;  
        setTitle('');
        setStatus('');
        setDate('');
        setNotes('');
      })
      .catch(err => console.error("Error adding job:", err))
  }


  return (
    <div>
      <h1>Job Tracker</h1>
      
  {/* display all the jobs in the UI*/}
    <div>{listOfJobs}</div>
  
  {/* Form to add new Job Title */}
  <form method="POST" onSubmit = {handleFormSubmit}>
    <label>Company Name:</label>
    <input
    type="text"
    value={company}
    onChange = {(e)=>setCompany(e.target.value)}
    />
     <label>Job Title :</label>
    <input
    type="text"
    value={title}
    onChange = {(e)=>setTitle(e.target.value)}
    />
    <label>Job Status :</label>
    <input
    type="text"
    value={status}
    onChange = {(e)=>setStatus(e.target.value)}
    />
    <label>Notes</label>
    <input 
    type="text"
    value={notes}
    onChange = {(e)=>setNotes(e.target.value)}
    />
    <label>Application Date :</label>
    <input
    type="date"
    value={date}
    onChange = {(e)=>setDate(e.target.value)}
    />
    <button type="submit">Submit</button>


  </form >
  {/* create a form tag */}
  {/* add a button with a type submit and when clicked runs a function to run a fetch POST req*/} 


    </div>
  )
}

export default App;
