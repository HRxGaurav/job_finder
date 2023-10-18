import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import '../Style/JobCards.css';
import employeelogo from '../Assets/Icons/Group 1.png'
import flag from '../Assets/Icons/flag.svg'
import LogContext from '../Utilities/LogContext';

const JobCards = (props) => {
  const [skills, setSkills] = useState([])
  const [logged] = useContext(LogContext);
  const {job_position, logo_url, monthly_salary, job_type, remote_office, location, skills_required, id } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (skills_required) {
        const array = skills_required.split(',');
        setSkills(array);
    }
}, [skills_required]);

  return (
    <>
      <div className='card-main'>
        <div className='card-left'>
        <div className='card-image'>
          <img className='company-logo' src={logo_url} alt='logo' />
        </div>
        <div className='job-grid'>
        <div className='card-detail'>
          <div className='job-position'>{job_position}</div>
          <div className='job-feed'>
            <div><img className='employeelogo' src={employeelogo} alt='employeelogo' /></div>
            <div className='employeeCount'>11-50</div>
            <div className='jobPay'>{`₹ ${monthly_salary}`}</div>
            <div className='flagDiv'><img className='flag' src={flag} alt='flag' /></div>
            <div className='jobPay'>{location}</div>
          </div>
          <div className='job-types'>
            <div className='job-type'>{remote_office}</div>
            <div className='job-type'>{job_type}</div>
          </div>
        </div>
      </div>
      </div>

      <div className='card-right'>
      <div className='card-skill'>
          <div className='job-skill'>

            {skills.map((value,index)=>{
              return <div className='job-skills'key={index} >{value}</div>
            })}
            
          </div>
        <div className='job-details'>
          {logged ? <button className='edit-job' onClick={()=>{navigate(`/edit_job/${id}`)}}>Edit job</button> : ""}
          <button className='view-job' onClick={()=>{navigate(`/job_description/${id}`)}}>View details</button>
        </div>

        </div>
      </div>

      </div>

    </>
  )
}

export default JobCards