import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signin({user}) {

  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      alert("You are already signed in");
      navigate("/home");
    }
  }, [user])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async(event) => {
    event.preventDefault();

    await axios.post("http://192.168.20.11:80/startup-inspired-game/api/signin.php", {
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem("user", res.data.email);
      alert(res.data.message);
      navigate("/home");
    })
  }

  return (
    <div className='signin'>
        <h5>Signin</h5>
        <form className='signinFrm needs-validation' noValidate>
          <div className='mb-3'>
            <label htmlFor='emailInp' className='form-label'>Email</label>
            <input onChange={(e)=> {setEmail(e.target.value)}} type='email' className='form-control' id='emailInp' name='emailInp' placeholder='Enter email' required autoComplete='on'/>
          </div>
          <div className='mb-3'>
            <label htmlFor='passwordInp' className='form-label'>Password</label>
            <input onChange={(e)=> {setPassword(e.target.value)}} type='password' className='form-control' id='passwordInp' name='passInp' placeholder='Enter password' required autoComplete='on'/>
          </div>
          <div className='mb-3'>
            <button onClick={handleSignin} type='submit' className='btn btn-primary'>Signin</button>
          </div>
        </form>
    </div>
    )
} 

export default Signin