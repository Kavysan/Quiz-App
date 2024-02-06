import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../styles/register.css'
import { useDispatch } from "react-redux";
import { setSubmittedActionFalse, setSubmittedAction } from "../redux/result_reducer";

export default function Login() {

    const dispatch = useDispatch()


    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
      })

    const navigate = useNavigate();
  


    function btnlogin(event) {
        axios({
            method: "POST",
            // url:"http://127.0.0.1:5000/logintoken",
            url:"https://quiz-backend-aao5.onrender.com/logintoken",
            data:{
                email: loginForm.email,
                password: loginForm.password
            }
          })
          .then(function (response) {
            if (response.status === 201) {
                console.log(response)
                alert("Successful Login");
                localStorage.setItem('email', loginForm.email)
                localStorage.setItem('token', response.data.access_token)

                navigate('/');
            } else {
                console.error("Unexpected response status:", response.status);
            }
          })
          .catch(function (error) {
            if (error.response){
                console.log(error.response)
                if(error.response.status === 401){
                    alert("Invalid Credentials")
                }
            }
          });
          setloginForm(({
            email: "",
            password: ""}))
 
        event.preventDefault()
    }
 

    function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}





    return (
  
    <div className="container boxx ring">
      <div className="signup-selection">
        <header>Login</header>
        <form>
            <input 
                type="email" 
                name="email" 
                value={loginForm.email} 
                onChange={handleChange} 
                text={loginForm.email} 
                id="form3Example3" 
                placeholder="Email" 
                required/>

          <input 
                type="password" 
                name="password" 
                value={loginForm.password} 
                onChange={handleChange}  
                text={loginForm.password} 
                id="form3Example4"
                placeholder="Password" 
                required/>
          <button
              type="submit"
              className="reg-btn"
              onClick={btnlogin}>
              Login
          </button>
          <div className="small link-login fw-bold mt-2 pt-1 mb-0">
              Don't have an account?{"   "}
              <Link to={"/register"} className="reg-link">
                Register
              </Link>
          </div>
        </form>
      </div>
    </div>
  )
}