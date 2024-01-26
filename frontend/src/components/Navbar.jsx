import axios from "axios";
import { Link,useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import '../styles/Navbar.css'
import {FaBars, FaTimes} from "react-icons/fa"
import Logo from '../images/quizzy-logo.png'

function Navbar() {

    const navigate = useNavigate();

    const [navbarVisible, setNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        console.log(navbarVisible)
        setNavbarVisible(!navbarVisible);
    };

    function logMeOut(){
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/logout",
        })
        .then((response) => {
            if(response.status === 201){
                console.log("logout buttom clicked")
                localStorage.removeItem('email')
                localStorage.removeItem('token')
                alert("Logout successful")
                // props.token()
                navigate("/login");
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    const logged = localStorage.getItem('email')
    console.log(logged)

    function navigateToLoginPage() {
      navigate('/login');
    }
    function navigateToHomePage() {
      navigate('/');
    }

  return (
    <>
      <div className="header">
          <div className="menu-bar">
              <nav className="navbar navbar-fixed-top navbar-expand-lg">
                  <Link to='/' className="navbar-brand"><img src="src/images/quiz_logo.png" alt="Logo" style={{ width: '150px'}} /></Link>
                  <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                      <FaBars />
                  </button>
                  <div className={`navbar-collapse ${navbarVisible ? 'show' : ''}`}>
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <Link to='/' className="nav-link">Home</Link>
                          </li>
                          <li className="nav-item">
                              {!logged ?
                                  <button className="nav-link btn" type="submit" onClick={navigateToLoginPage}>Login</button>
                                  :
                                  <button className="nav-link btn " type="submit" onClick={logMeOut}>Logout</button>
                              }
                          </li>
                      </ul>
                  </div>
              </nav>
          </div>
      </div>
    </>
  );
}
export default Navbar