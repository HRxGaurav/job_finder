import React, { useContext, useEffect, useState } from 'react';
import textformater from '../Utilities/TextFormater';
import { useParams, useNavigate } from 'react-router-dom';
import getJobDescription from '../APIs/getJobDescription';
import jobdetails from '../Style/JobDetails.module.css';
import stipend from '../Assets/Icons/stipend.svg';
import calender from '../Assets/Icons/calender.svg';
import LogContext from '../Utilities/LogContext';


const JobDetails = () => {

  const navigate = useNavigate();
  
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [logged] = useContext(LogContext)
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const result = await getJobDescription(id);
      if (result.success && result.data) {
        setJobDetails(result.data.data);
  
        if (result.data.data.skills_required) {
          setSkills(result.data.data.skills_required.split(','));
        } else {
          setSkills([]);
        }
  
      } else {
        console.error('Error fetching job details:', result.message);
      }
    };
  
    fetchJobDetails();
  }, [id]);



  return (
    <>
      {jobDetails ? (
        <div>
          <div className={jobdetails.post_detail}>
            {jobDetails.job_position} {jobDetails.job_type} at {jobDetails.company_name}
          </div>

          <div className={jobdetails.job_deatil}>
            <div style={{ display: 'flex' }}>
              <div className={jobdetails.names}>1w ago  . {jobDetails.job_type}</div>
              <img className={jobdetails.logo} src={jobDetails.logo_url} alt="companylogo" />
              <div className={jobdetails.names}>{jobDetails.company_name}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={jobdetails.title}>{jobDetails.job_position}</div>
              {logged ? <div className={jobdetails.edit} onClick={()=>{navigate(`../edit_job/${id}`)}}>Edit job</div>: ""}
            </div>

            <div className={jobdetails.location}>{jobDetails.location} | India</div>

            <div style={{ display: 'flex', marginTop: '42px' }}>
              <div style={{ marginRight: '40px' }}>
                <div className={jobdetails.stidur}>
                  <img className={jobdetails.stipend} src={stipend} alt="logo" />
                  Stipend
                </div>
                <div className={jobdetails.stipendAmount}>Rs {jobDetails.monthly_salary}/month</div>
              </div>

              <div style={{ marginTop: '1px' }}>
                <div className={jobdetails.stidur}>
                  <img className={jobdetails.calender} src={calender} alt="logo" />
                  Duration
                </div>
                <div className={jobdetails.durationAmount}>6 Months</div>
              </div>
            </div>

            <div className={jobdetails.about}>About Company</div>
            <div className={jobdetails.aboutCompany}>{jobDetails ? textformater(jobDetails.about_company): ""}</div>

            <div className={jobdetails.about}>About the job/internship</div>
            <div className={jobdetails.aboutCompany}>{jobDetails ? textformater(jobDetails.job_description): ""}</div>

            <div className={jobdetails.about}>Skill(s) required</div>
            <div className={jobdetails.job_skill}>
              {skills.map((value, index) => (
                <div className={jobdetails.job_skills} key={index}>
                  {value}
                </div>
              ))}
            </div>

            <div className={jobdetails.about}>Additional Information</div>
            <div className={jobdetails.aboutCompany}>
            {jobDetails ? textformater(jobDetails.information): ""}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default JobDetails;
