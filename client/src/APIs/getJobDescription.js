const getJobDescription = async (params) => {
    try {
      const reqUrl = `/jobDescription/${params}`;
  
      const response = await fetch(reqUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return { success: true, data };
      } else {
        return { success: false, message: 'Get job description data failed' };
      }
    } catch (error) {
      console.error('Error getting job data:', error);
      return { success: false, message: 'An error occurred' };
    }
  };
  
  export default getJobDescription;
  