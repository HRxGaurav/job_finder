import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import LoginSignUp from '../Assets/Images/LoginSignUp.jpg'
import Cookies from 'js-cookie'; 
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
      const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [logged, setLogged] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const loginButton = async () => {

        const { email, password } = formData;

        const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`,  //Bearer 
            },
            body: JSON.stringify({
                email, password
            })
        }
        )
        const data = await res.json();


        if (res.status === 200) {
            // window.alert("logged in")
            
            setLogged(true);
            Cookies.set('token', data.token, { expires: 7 });
            Cookies.set('name' , data.name, {expires: 7})
            navigate('/')
            
        } else {
            window.alert("invalid Details")
        }
    };

        

    return (

        <>
            <div className="container">
                <div className="register-form">

                    <div>
                        <div >
                            <h1 className='main-heading'>Already have an account?</h1>
                            <h1 className='sub-heading'>Your personal job finder is here</h1>

                            <input className='sign-input' type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} autoComplete='off' />
                        </div>
                        <div >

                            <input className='sign-input' type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} autoComplete='off'
                            />
                        </div>


                        <br />
                        <button className='sign-button' onClick={loginButton}>Sign in</button>
                        <ToastContainer position="top-center" hideProgressBar={false}/>

                        <h1 className='sub-heading'>Don’t have an account?<span className='sign-in'><NavLink to="/Register" >Sign Up</NavLink></span></h1>

                    </div>
                </div>
                <div className="image-container">
                <h1 className='img-text-reg'>Your Personal Job Finder</h1>
                    <img src={LoginSignUp} alt="Registration" className="registration-image" />
                </div>

            </div>
        </>
    )
}

export default Login