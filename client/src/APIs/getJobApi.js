// import dotenv from 'dotenv'

// dotenv.config()

const getJobApi = async (skillsRequired, jobPosition) => {

    try {
        // const reqUrl = 'https://job-finder-app-z93s.onrender.com/getjobs'; // Replace with your actual API endpoint for filtering jobs
        const reqUrl = `${process.env.REACT_APP_BACKEND}/getjobs`;
        const requestBody = {
            skills_required: skillsRequired,
            job_position: jobPosition,
        };

        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status === 200) {
            const data = await response.json();
            return { success: true, data: data.data };
        } else {
            return { success: false, message: 'Filter jobs failed' };
        }
    } catch (error) {
        console.error('Error filtering jobs:', error);
        return { success: false, message: 'An error occurred' };
    }
};

export default  getJobApi ;
