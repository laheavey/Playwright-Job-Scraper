import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobTable from './JobTable';

export default function App () {
  const dispatch = useDispatch();
  const jobs = useSelector(store => store.jobs);
  const newJobs = useSelector(store => store.newJobs);

  useEffect(() => {
    dispatch({ type: 'SAGA/FETCH_JOBS' })
    dispatch({ type: 'SAGA/FETCH_NEW_JOBS' })
  }, [])

  useEffect(() => {
      postNewJobs()
  }, [newJobs])

  const postNewJobs = () => {
    const results = newJobs.filter(({ apply: id1 }) => !jobs.some(({ url: id2 }) => id2 === id1));

    results.forEach((job) => {
      dispatch({
        type: 'SAGA/POST_NEW_JOBS',
        payload: job
      })
    })
  }

  return (
    <>
    <h1>Hi</h1>
    <JobTable/>
    </>
  )
}