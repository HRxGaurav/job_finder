import { useState, useEffect, useContext } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import loggedIn from '../APIs/loggedIn';
import Cookies from 'js-cookie';
import userIcon from '../Assets/Icons/user.png'
import '../Style/Navbar.css'
import LogContext from '../Utilities/LogContext';


const Navbar = () => {
    const navigate = useNavigate();

    
    const [name, setName] = useState("");
    const [logged, setLogged] = useContext(LogContext)

    const logout =()=>{
        setLogged(false);
        Cookies.remove('token');
        Cookies.remove('name');
        navigate('/')

    }

    useEffect(() => {
        setName(Cookies.get('name'));
    }, [])

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const userLoggedIn = await loggedIn();
                setLogged(userLoggedIn===200);                               
            } catch (error) {
                console.error('Error checking user login status:', error);
            }
        };
    
        checkLoggedIn();
    }, []);

    
    
    
    return (
        <>
            <nav className="navbar">
                <div className="logo" onClick={()=>{navigate('/')} } style={{cursor:'pointer'}}>Jobfinder</div>
                <div className="buttons">
                    {!logged && <button className="login-button"><NavLink className="navlink-button1" to="/login" activeClassName="active">Login</NavLink></button>}
                    {!logged && <button className="register-button"><NavLink to="/register" className="navlink-button2">Register</NavLink></button>}
                    {logged &&<h1 className='nav-text' style={{cursor:'pointer'}} onClick={logout}>Logout</h1>}
                    {logged &&<h1 className='nav-text'>Hello! {name}</h1>}
                    {logged &&<img className='user-icon' src={userIcon} alt='user-icon'></img>}
                     
                </div>
            </nav>           
        </>
    )
}

export default Navbar