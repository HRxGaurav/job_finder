

const getJobApi = async (skillsRequired, jobPosition) => {
    try {
        const reqUrl = '/getjobs'; // Replace with your actual API endpoint for filtering jobs

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
