import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import JobTable from './JobTable';

export default function App () {
  const dispatch = useDispatch();
  const jobs = useSelector(store => store.jobs);
  const newJobs = useSelector(store => store.newJobs);
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    dispatch({ type: 'SAGA/FETCH_JOBS' })
    dispatch({ type: 'SAGA/FETCH_NEW_JOBS' })
  }, [])

  useEffect(() => {
      postNewJobs()
  }, [newJobs])

  const postNewJobs = () => {
    let jobsToPush = [...newJobs];
    let repeatJobs = [];

    for (let i = 0; i < jobs.length; i++){
      for (let j = 0; j < newJobs.length; j++){
        if (newJobs[j].title === jobs[i].title){
          repeatJobs.push(newJobs[i])
          jobsToPush.shift();
        }
      }
    }

    console.log('Jobs to push: ', jobsToPush)

    // jobsToPush.forEach((job) => {
    //   dispatch({
    //     type: 'SAGA/POST_NEW_JOBS',
    //     data: job
    //   })
    // })

    dispatch({
      type: 'SAGA/POST_NEW_JOBS',
      payload: jobsToPush[0]
    })
  }

    return (
      <>
      <h1>Hi</h1>
      <JobTable/>
      </>
    )
}