import Cookies from 'js-cookie';

const editJobApi = async (req) => {
    const {params,jobDescription } = req;
  try {
    const reqPayload = {
      ...jobDescription
    };

    const response = await fetch(`/editjob/${params}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Cookies.get('token')}` //Bearer 
      },
      body: JSON.stringify(reqPayload)
    });

    if (response.status === 200) {
      const data = await response.json();
      return { success: true, data:data };
    } else {
      return { success: false, message: 'Job update failed' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
};



export default editJobApi;