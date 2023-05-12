import { useEffect, useState } from 'react';
import axios from 'axios';
import JobTable from './JobTable';

export default function App () {
  const [jobsArray, setJobsArray] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetchJobs();
  }, [])

  const fetchJobs =  () => {
     axios.get('/get')
    .then((response) => {
      setJobsArray(response.data)
      setDataLoaded(true)
    })
  }

  if (dataLoaded) {
    return (
      <>
      <h1>Hi</h1>
      <JobTable jobsArray={jobsArray}/>
      </>
    )
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}