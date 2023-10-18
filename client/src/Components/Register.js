import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginSignUp from '../Assets/Images/LoginSignUp.jpg'
import '../Style/Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', tnc: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const registerButton = async () => {

    const { name, email, phone, password } = formData;

    const res = await fetch('/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, phone, password
      })
    }
    )
    
    const data = await res.json();

    if (res.status === 201) {
      console.log(data);
      window.alert("Sucessfull Register")
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('name', data.name, { expires: 7 });
        navigate('/')
    } else {
      window.alert(data ? data.error : "invalid Details")
    }
  };



  return (
    <>
      <div className="container">
        <div className="register-form">

          <div>
            <div >
          <h1 className='main-heading'>Create an account</h1>
          <h1 className='sub-heading'>Your personal job finder is here</h1>

              <input className='sign-input' type="text" name="name" value={formData.name} onChange={handleChange} autoComplete='off' placeholder='Name'
              />
            </div>
            <div >

              <input className='sign-input' type="email" name="email" value={formData.email} onChange={handleChange} autoComplete='off' placeholder='Email'
              />
            </div>
            <div >

              <input className='sign-input' type="text" name="phone" value={formData.phone} onChange={handleChange} autoComplete='off' placeholder='Mobile Number'
              />
            </div>

            <div>

              <input className='sign-input' type="password" name="password" value={formData.password} onChange={handleChange} autoComplete='off' placeholder='Password'
              />
            </div>

            <div className='margin-checkbox'>
            <input type="checkbox" id="tnc" className='checkbox' name="tnc" checked={formData.tnc} onChange={handleChange}/>
            <label htmlFor="tnc" className="tnc" style={{ position:'relative', top:"3px" }}>  By creating an account, I agree to our terms of use and privacy policy</label>
            </div>
            <br/>
            <button onClick={registerButton} className='sign-button'> Create Account</button>


        <h1 className='sub-heading'>Already have an account?<span className='sign-in'><NavLink to="/Login" >Sign In</NavLink></span></h1>
          </div>
        </div>
        <div className="image-container">
        <h1 className='img-text-reg'>Your Personal Job Finder</h1>
          <img src={LoginSignUp} alt="Registration" className="registration-image"/>
        </div>

      </div>
    </>
  );
}

export default Register;
