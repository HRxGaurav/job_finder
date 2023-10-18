import React, { useState, useEffect } from 'react';
import loggedIn from '../APIs/loggedIn';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import jobpostimage from '../Assets/Images/jobpost.jpg'
import jobPostApi from '../APIs/jobPostApi';
import getJobDescription from '../APIs/getJobDescription';
import editJobApi from '../APIs/editJobApi';


const JobPost = () => {
    // eslint-disable-next-line
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const editPage = location.pathname.startsWith("/edit_job");
    const [validUser, setValidUser] = useState();

    const [jobPost, setJobPost] = useState({
        company_name: '',
        logo_url: '',
        job_position: '',
        monthly_salary: '',
        job_type: '',
        remote_office: '',
        location: '',
        job_description: '',
        about_company: '',
        skills_required: '',
        information: '',
    });
    
    

    useEffect(() => {

        const fetchJobDetails = async () => {
            const result = await getJobDescription(id);
            if (result.success && result.data) {  
              setJobPost({
                company_name: result.data.data.company_name,
                logo_url: result.data.data.logo_url,
                job_position: result.data.data.job_position,
                monthly_salary: result.data.data.monthly_salary,
                job_type: result.data.data.job_type,
                remote_office: result.data.data.remote_office,
                location: result.data.data.location,
                job_description: result.data.data.job_description,
                about_company: result.data.data.about_company,
                skills_required: result.data.data.skills_required,
                information: result.data.data.information,
              });    
        
            } else {
              console.error('Error fetching job details:', result.message);
            }
          };
        const checkLoggedIn = async () => {
            try {
                const userLoggedIn = await loggedIn();
                setValidUser(userLoggedIn===200 );                               
            } catch (error) {
                console.error('Error checking user login status:', error);
                throw(error);
            }
        };
    
        checkLoggedIn();
        fetchJobDetails();
    }, [editPage, navigate]);

    if (!validUser && editPage) {
        navigate('/login');
    }
  
    
   

    const jobTypes = ['Full Time', 'Part Time', 'Internship'];
    const remoteOfficeOptions = ['Remote', 'Office'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobPost({
            ...jobPost,
            [name]: value,
        });
    };

    const addJob = async () => {
        const { company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location, job_description, about_company, skills_required, information } = jobPost;

        try {
            const result = await jobPostApi({
                company_name,
                logo_url,
                job_position,
                monthly_salary,
                job_type,
                remote_office,
                location,
                job_description,
                about_company,
                skills_required,
                information
            });

            if (result.success) {
                window.alert('Job posted successfully');
                navigate(-1);
            } else {
                window.alert(result.message);
            }

        } catch (error) {
            console.log('Error posting job:', error);
        }
    };

    const updateJob = async () => {
        // Construct a `jobDescription` object with the updated job details
        const updatedJobDescription = {
            company_name: jobPost.company_name,
            logo_url: jobPost.logo_url,
            job_position: jobPost.job_position,
            monthly_salary: jobPost.monthly_salary,
            job_type: jobPost.job_type,
            remote_office: jobPost.remote_office,
            location: jobPost.location,
            job_description: jobPost.job_description,
            about_company: jobPost.about_company,
            skills_required: jobPost.skills_required,
            information: jobPost.information,
        };
    
        try {
            // Call the editJobApi function to update the job
            const result = await editJobApi({
                params: id, // Use the current job ID
                jobDescription: updatedJobDescription,
            });
    
            if (result.success) {
                window.alert('Job updated successfully');
                navigate(-1); // Navigate back to the job details page
            } else {
                window.alert(result.message);
            }
        } catch (error) {
            console.error('Error updating job:', error);
        }
    }
    


    const cancelJob = () => {
        editPage ?  navigate(-1): navigate('/');
    };

    return (
        <>
            <div className="container-job">
                <div className="register-form">
                    <div>
                        <h1>{editPage ? "Edit" : "Add"} job description</h1>
                        <div className='main-input' >

                            <div className='labelDiv'><label className='jobpost-label' htmlFor="company_name">Company Name </label></div>
                            <input
                                placeholder='Enter your company name here'
                                className="jobpost-input"
                                type="text"
                                id="company_name"
                                name="company_name"
                                value={jobPost.company_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="logo_url">Add Logo URL </label></div>
                            <input
                                placeholder='Enter the link'
                                className="jobpost-input"
                                type="text"
                                id="logo_url"
                                name="logo_url"
                                value={jobPost.logo_url}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="job_position">Job Position </label></div>
                            <input
                                placeholder='Enter job position'
                                className="jobpost-input"
                                type="text"
                                id="job_position"
                                name="job_position"
                                value={jobPost.job_position}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="monthly_salary">Monthly Salary </label></div>
                            <input
                                placeholder='Enter Amount in rupees'
                                className="jobpost-input"
                                type="text"
                                id="monthly_salary"
                                name="monthly_salary"
                                value={jobPost.monthly_salary}
                                onChange={handleChange}
                            />
                        </div>


                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="job_type">Job Type </label></div>
                            <select
                                className="jobpost-select"
                                id="job_type"
                                name="job_type"
                                value={jobPost.job_type}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {jobTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="remote_office">Remote/Office </label></div>
                            <select
                                className="jobpost-select"
                                id="remote_office"
                                name="remote_office"
                                value={jobPost.remote_office}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {remoteOfficeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="location">Location </label></div>
                            <input
                                placeholder='Enter Location'
                                className="jobpost-input"
                                type="text"
                                id="location"
                                name="location"
                                value={jobPost.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label className='jobpost-label' htmlFor="job_description">Job Description </label>
                            <textarea
                                placeholder='Type the job description'
                                className="jobpost-input-textarea"
                                id="job_description"
                                name="job_description"
                                value={jobPost.job_description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="input-wrapper">
                            <label className='jobpost-label' htmlFor="about_company">About Company </label>
                            <textarea
                                placeholder='Type the job description'
                                className="jobpost-input-textarea"
                                id="about_company"
                                name="about_company"
                                value={jobPost.about_company}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="skills_required">Skills Required </label></div>
                            <input
                                placeholder='Enter the must have skills'
                                className="jobpost-input"
                                id="skills_required"
                                name="skills_required"
                                value={jobPost.skills_required}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div className='main-input'>
                            <div className='labelDiv'><label className='jobpost-label' htmlFor="information">Additional Information </label></div>
                            <input
                                placeholder='Enter the additional information'
                                className="jobpost-input"
                                id="information"
                                name="information"
                                value={jobPost.information}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div className='button-alignment'>
                            <button className='cancel-button' onClick={cancelJob}>Cancel</button>
                            <button className='addjob-button' onClick={editPage ? updateJob : addJob}>{editPage ? "Update Job": "+ Add Job"}</button>
                        </div>
                    </div></div>


                <div className="image-container">
                    <h1 className='img-text'>Recruiter {editPage ? "update": "add"} job details here</h1>
                    <img src={jobpostimage} alt="JobPost" className="jobpost-image" />
                </div>

            </div>

        </>

    )
};

export default JobPost;