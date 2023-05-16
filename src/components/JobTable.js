import { useSelector } from 'react-redux';

export default function JobTable () {
  const jobs = useSelector(store => store.jobs);

  return (
    <table>
      <caption>
        Software Jobs
      </caption>
      <thead>
        <tr>
          <th scope="col">Scrape Date</th>
          <th scope="col">Company</th>
          <th scope="col">Job Title</th>
          <th scope="col">Location</th>
          <th scope="col">Apply</th>
        </tr>
      </thead>
      <tbody>
        {jobs?.map((job) => {
          return (
            <tr key={`${job.id}`}>
              <td>{job.to_char}</td>
              <td>{job.company}</td>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>
                <button name="Apply to Job">
                  <a href={job.url}>Apply</a>
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}