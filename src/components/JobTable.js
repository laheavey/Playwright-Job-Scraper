export default function JobTable ({jobsArray}) {

  return (
    <table>
      <caption>
        Software Jobs
      </caption>
      <thead>
        <tr>
          <th scope="col">Job Title</th>
          <th scope="col">Company</th>
          <th scope="col">Location</th>
          <th scope="col">Apply</th>
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
                <button name="Apply to Job">
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