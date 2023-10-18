import Cookies from "js-cookie";

const loggedIn = async () => {
    try {
        // eslint-disable-next-line
      const response = await fetch('/loggedin', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
      });
    //   const data = await response.json();
    if(response.status!==200){
        Cookies.remove('token');
        Cookies.remove('name')
    }
      return (response.status);
    } catch (error) {
      return (false);
    }
  };

  export default loggedIn;