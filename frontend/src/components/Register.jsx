import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css"

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: ""
  });

  const navigate = useNavigate();

  function btnRegister(event) {

    axios({
      method: "POST",
      // url: "http://127.0.0.1:5000/signup", 
      url: "https://quiz-backend-aao5.onrender.com/signup", 
      data: {
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name, 
        phone: registerForm.phone
      },
    })
      .then(function (response) {
        if (response.status === 201) {
          console.log(response);
          alert("Registration Successful");
          navigate('/login');
        } else {
          console.error("Unexpected response status:", response.status);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 409) {
            alert("Email already exists. Please use a different email.");
          } else {
            console.log(error);}
      });

    setRegisterForm({
      email: "",
      password: "",
      name: "",
      phone: ""
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  return (
    <div className="container boxx">
      <div className="signup-selection">
        <header>Signup</header>
        <form>
          <input 
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleChange}
                id="form3Example5" 
                placeholder="Full Name" 
                required/>

          <input 
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleChange}
                id="form3Example3"
                placeholder="Email Address" 
                required/>
          <input 
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleChange}
                id="form3Example4" placeholder="Password" 
                required/>
          <input 
                type="text"
                name="phone"
                value={registerForm.phone}
                onChange={handleChange}
                id="form3Example7"
                placeholder="Phone Number" 
                required/>
          <button
              type="submit"
              className="reg-btn"
              onClick={btnRegister}>
              Register
          </button>
          <p className="small link-login fw-bold mt-2 pt-1 mb-0">
              Already have an account?{"  "}
              <Link to={"/login"} className="reg-link">
                Login
              </Link>
          </p>
        </form>
      </div>
    </div>
  );
}