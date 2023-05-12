export default function JobTable ({jobsArray}) {

  return (
    <table>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Apply</th>
        </tr>
      </thead>
      <tbody>
        {jobsArray?.map((job) => {
          return (
            <tr id={`${job.apply}`}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>
                <button>
                  <a href={job.apply}>Apply</a>
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}