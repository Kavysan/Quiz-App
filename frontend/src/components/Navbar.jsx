import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/Navbar.css'
import {FaBars} from "react-icons/fa"
import { useDispatch } from "react-redux";
import { resetResultAction} from "../redux/result_reducer";
import {resetAllAction} from '../redux/questions_reducer';
import DarkMode from "./DarkMode";

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [navbarVisible, setNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setNavbarVisible(!navbarVisible);
    };

    function logMeOut(){
        axios({
            method: "POST",
            // url:"http://127.0.0.1:5000/logout",
            url:"https://quiz-backend-aao5.onrender.com/logout",
        })
        .then((response) => {
            if(response.status === 201){
                localStorage.removeItem('email')
                localStorage.removeItem('token')
                // dispatch(setSubmittedActionFalse())
                dispatch(resetAllAction());
                dispatch(resetResultAction());
                alert("Logout successful")
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

    function navigateToLoginPage() {
      navigate('/login');
    }
    function navigateToHomePage() {
      navigate('/');
    }

    function navigateToResultPage() {
      navigate('/result')
    }

    function navigateToProfile() {
      navigate('/profile')
    }


  return (
    <>
      <div className="header">
        <div className="menu-bar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/' className="navbar-brand"><img src="src/images/quiz_logo.png" alt="Logo" style={{ width: '150px'}} /></Link>
            <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
              <FaBars />
            </button>
            <div className={`collapse navbar-collapse ${navbarVisible ? 'show' : ''}`}>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <button className="nav-link btn ml-auto" type="submit" onClick={navigateToHomePage}>Home</button>
                </li>
                {logged && (
                  <>
                    <li className="nav-item">
                        <button className="nav-link btn ml-auto" type="submit" onClick={navigateToProfile}>Profile</button>
                    </li>
                    {/* <li className="nav-item">
                        <button className="nav-link btn ml-auto" type="submit" onClick={navigateToResultPage}>Results</button>
                    </li> */}
                  </>
                  )}
                  <li className="nav-item">
                      {!logged ?
                        <button className="nav-link btn ml-auto" type="submit" onClick={navigateToLoginPage}>Login</button>
                        :
                        <button className="nav-link btn ml-auto" type="submit" onClick={logMeOut}>Logout</button>
                      }
                  </li>
                  <li className="nav-item">
                      <DarkMode />
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