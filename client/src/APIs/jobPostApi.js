import Cookies from 'js-cookie';

const jobPostApi = async (jobDescription) => {
  try {
    const reqPayload = {
      ...jobDescription
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND}/jobpost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Cookies.get('token')}` //Bearer 
      },
      body: JSON.stringify(reqPayload)
    });

    if (response.status === 201) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: 'Job post failed' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
};



export default jobPostApi;