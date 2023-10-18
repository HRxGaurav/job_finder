import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/JobFilter.css';
import getJobApi from '../APIs/getJobApi';
import JobCards from './JobCards';
import LogContext from '../Utilities/LogContext'; 
import searchIcon from '../Assets/Icons/search.svg'


const JobFilter = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [logged] = useContext(LogContext);
    const [inputValue, setInputValue] = useState(''); // State for input value
    const [selectedArray, setSelectedArray] = useState([]); // State for selected skills
    const [optionRefresh, setOptionRefresh] = useState(true);
    const [options, setOptions] = useState(null)
    // const options = "Frontend, HTML, CSS, React, JavaScript"; 

    // Function to handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Function to add a skill to the selectedArray
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        if (!selectedArray.includes(selectedValue)) {
            setSelectedArray([...selectedArray, selectedValue]);
        }
    };

    // Function to remove a skill from selectedArray
    const handleRemoveTag = (indexToRemove) => {
        const updatedArray = selectedArray.filter((_, index) => index !== indexToRemove);
        setSelectedArray(updatedArray);
    };

    // Function to clear input and selected skills
    const handleClear = () => {
        setInputValue('');
        setSelectedArray([]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchJobs();
        }
    };

    useEffect(() => {
        /* eslint-disable */
        handleSearchJobs();
    }, [selectedArray])


    useEffect(() => {
        
        if (optionRefresh && data.length > 1) {
            // Extract skills_required from each data entry
            const skillsArray = data.map((entry) => entry.skills_required.split(',').map((skill) => skill.trim()));

            // Flatten the array and create a Set to ensure uniqueness
            const uniqueSkillsSet = new Set(skillsArray.flat());

            setOptions([...uniqueSkillsSet].sort())
            setOptionRefresh(false)            
        }
    },[data]);



    // Function to handle search and filter jobs
    const handleSearchJobs = async () => {
        const jobPosition = inputValue;
        const skillsRequired = selectedArray.join(',');

        // API request to filter jobs
        const result = await getJobApi(skillsRequired, jobPosition);

        if (result.success) {
            setData(result.data)
        } else {
            console.error('Filter jobs failed:', result.message);
        }
    };

    return (
        <>
            <div className="job-main">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type any job title"
                    className="jobfilter-input"
                />
                <img className="search-icon" src={searchIcon} alt="Search" />
                <br />
                <div className="tags">
                    <select
                        value=""
                        onChange={handleSelectChange}
                        className="jobfilter-select"
                    >
                        <option value="" disabled>
                            Skills
                        </option>
                        {options !== null && options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {selectedArray.map((tag, index) => (
                        <div key={index} className="filter-tag">
                            {tag}
                            <div className="x-button" onClick={() => handleRemoveTag(index)}>
                                X
                            </div>
                        </div>
                    ))}
                    {selectedArray.length > 0 && <button className="filter-clear" onClick={handleClear}>Clear</button>}

                    {logged ? <button className='filter-addjob' onClick={() => { navigate("/jobpost") }}>+ Add Job </button> : ""}
                </div>
            </div>

            {data.map((data, index) => (
                <JobCards key={index} job_position={data.job_position} logo_url={data.logo_url} monthly_salary={data.monthly_salary} job_type={data.job_type} remote_office={data.remote_office} location={data.location} skills_required={data.skills_required} id={data._id} />
            )
            )}
        </>
    );
};

export default JobFilter;
