import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App () {
  useEffect(() => {
    fetchJobs();
  }, [])

  const fetchJobs = () => {
    console.log('In fetchJobs')
    axios.get('/get')
    .then((response) => {
      console.log('Response in App.js: ', response.data)
    }).catch((error) => {
      console.log('Error: ', error)
    })
  }

  return (
    <>
    <h1>Hi</h1>

    </>
  )
}