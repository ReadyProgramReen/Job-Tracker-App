import { useState, useEffect } from "react";
import './JobTracker.css'

function App() {
  //all job data state
  const [jobs, setJobs] = useState([]);
  //company input state
  const [company, setCompany] = useState("");
  //Job title input state
  const [title, setTitle] = useState("");
  //Job Status input state
  const [status, setStatus] = useState("");
  //notes input state
  const [notes, setNotes] = useState("");
  //Date input  state
  const [date, setDate] = useState("");
  //Track the editing jobs state
  const [editingJobId, setEditingJobId] = useState(null);
  //edit company
  const [editCompany, setEditCompany] = useState("");
  //edit job title
  const [editTitle, setEditTitle] = useState("");
  //edit job status
  const [editStatus, setEditStatus] = useState("Applied");
  //edit job notes
  const [editNotes, setEditNotes] = useState("");
  //edit job dates
  const [editDate, setEditDate] = useState("");
  //To add new job to list
  const [addNewJob, setAddNewJob] = useState(false)

  //Fetches all the jobs data
  function fetchJobs() {
    fetch("http://localhost:8000/jobs")
      //converts the response back to an object
      .then((res) => res.json())
      //re assigns the jobs states with the data from the fetch
      .then((data) => setJobs(data))
      //catches the error
      .catch((err) => console.error("Error fetching jobs:", err));
  }

  //on page load : fetch the jobs data from the server
  useEffect(() => {
    fetchJobs();
  }, []);

  // Edit jobs function with a passed in id when save edit button is clicked
  function handleSave(id) {
    console.log("handle edit button");

    //fetch PUT
    fetch(`http://localhost:8000/jobs/${id}`, {
      //declare the method
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        company: editCompany,
        title: editTitle,
        status: editStatus,
        date: editDate,
        notes: editNotes,
      }),
    })
      .then(() => {
        //re-fetch the list
        fetchJobs();
        //reassigns the edit tracker state back to null
        setEditingJobId(null);
      })
      .catch((err) => console.log(err));
  }

    // Random colors for each job card 
  const cardColors = ['#fce4ec', '#e8f5e9', '#e3f2fd', '#fff3e0', '#f3e5f5', '#f0f4c3'];

  // reverse the jobs list to show the newest job at the top
  const reversedJobs = [...jobs].reverse()

  //the entire list of jobs
  const listOfJobs = reversedJobs.map((eachJob,index) => (
    <div key={eachJob.id} 
    className="job-card"
    style={{ backgroundColor: cardColors[index % cardColors.length] }}

    >
      {/* when user clicks edit on a jobs list :job is in edit mode so the input field is displayed*/}
      {editingJobId === eachJob.id ? (
        <>
          <p>
            <input
              value={editCompany}
              onChange={(e) => setEditCompany(e.target.value)}
            />
          </p>
          <p>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </p>
          <p>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
            </select>
          </p>
          <p>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
          </p>
          <p>
            <input
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
            />
          </p>

          {/*  Save Edit button */}
          <button className="save-edit" onClick={() => handleSave(eachJob.id)}>Save </button>
        </>
      ) : (
        //  OR Normal display and Edit button
        <>
        
            <h2>{eachJob.company.toUpperCase()}</h2>
          
        
            <h3>{eachJob.title}</h3>
          
        
            <h3>{eachJob.status}</h3>
          
        
            <h3>{eachJob.notes}</h3>
          
        
            <h3>{new Date(eachJob.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</h3>
          

        
            <button onClick={() => handleDelete(eachJob.id)}>
              <img src="/delete.png" alt="Delete" width="20" />
              </button>
          
        
            <button
              onClick={() => {
                {
                  // inform the edit tracker state of which jobs id was clicked
                  setEditingJobId(eachJob.id);
                  //keep the value of each current input field in case user only wants to edit some of the fields
                  setEditCompany(eachJob.company);
                  setEditTitle(eachJob.title);
                  setEditStatus(eachJob.status);
                  setEditDate(eachJob.date);
                  setEditNotes(eachJob.notes);
                }
              }}
              
            >
               <img src="/edit.png" alt="Edit" width="20" />
            </button>
          
        </>
      )}
    </div>
  ));

  //Client deleted a job with the id
  function handleDelete(id) {
    //Fetch: delete request
    fetch(`http://localhost:8000/jobs/${id}`, {
      //declare the method
      method: "DELETE",
    })
      //re-fetch the jobs data from the server
      .then(() => fetchJobs())
      //catching the fetch delete errors
      .catch((err) => console.log("fetch delete error:", err));
  }

  // when client submits a form : implement a fetch PUT request
  function handleFormSubmit(e) {
    // stops browser from reloading
    e.preventDefault();
    // console.log("handleFormSubmit")

    //POST fetch request
    fetch(`http://localhost:8000/jobs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        company: company,
        title: title,
        status: status,
        date: date,
        notes: notes,
      }),
    })
      // once POST Fetch is successful:
      .then(() => {
        //re-fetch the full list so the screen updates
        fetchJobs();
        // clear the form input field using the set Value States
        setCompany("");
        setTitle("");
        setStatus("");
        setDate("");
        setNotes("");
      })
      .catch((err) => console.error("Error adding job:", err));
    
      //Once the form is sent show the user the + button again
      setAddNewJob(false)
  }
  
  //Button to show the form field
    function addNewForm(){
      //  when clicked  the form will be shown to the user
      setAddNewJob(true)
    }



  return (
    <div className="app-container">
      <h1>Job Tracker</h1>

     

    {/*If the client clicks the + button to add new form . The form apears  */}
    {!addNewJob ? (
      <>
      <button className="add-new-form-btn" onClick={()=>addNewForm()}>+</button>
      </>
    ):(
      <>
      {/* Form to add new Job Title */}
     <form method="POST" onSubmit={handleFormSubmit}>
  <div className="form-row">
    <div className="form-group">
      <label>Company Name:</label>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required 
      />
    </div>
    <div className="form-group">
      <label>Job Title :</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required 
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label>Job Status :</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)} required >
        <option value="" disabled>
          Select status
        </option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
      </select>
    </div>

    <div className="form-group">
      <label>Notes</label>
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        required 
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group ">
      <label>Application Date :</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required 
      />
    </div>

    <button type="submit">Submit</button>
  </div>
</form>

      
      </>

    )
    
    }

     {/* display all the jobs in the UI*/}
      <div className="job-list">{listOfJobs}</div>
      


    </div>
  );
}

export default App;
