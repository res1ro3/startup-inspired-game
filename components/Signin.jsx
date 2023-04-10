import React, { useState } from 'react';
import axios from 'axios';

function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async(event) => {
    event.preventDefault();

    await axios.post("http://localhost:80/startup-inspired-game/api/signin.php", {
      email,
      password,
      token: localStorage.getItem("token")
    })
    .then((res) => {
        localStorage.setItem("token", res.data.token);
        alert(res.data.message);
    })
  }

  const signOut = async(event) => {
    event.preventDefault();

    await axios.post("http://localhost:80/startup-inspired-game/api/signout.php")
    .then((res) => {
        localStorage.setItem("token", "");
        alert(res.data);
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
        <button onClick={signOut} type='button' className='btn btn-primary'>Signout</button>
    </div>
    )
} 

export default Signin