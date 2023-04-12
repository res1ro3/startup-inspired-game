import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../../styles/admin.css";
import { useNavigate } from 'react-router-dom';

function AddUsers() {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [accountType, setAccountType] = useState("User");

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    function submitUser(e) {
        e.preventDefault();
        if (password === confirmpassword) {
            axios.post('http://192.168.20.11:80/startup-inspired-game/api/user.php', {
                email,
                password,
                accountType
            }).then(function(response) {
                alert(response.data.message);
                if (response.data.status == 1) {
                    navigate("/admin/manageusers");
                }
                
            });
        } else {
            alert("Password and Confirm Passowrd does not match");
        }
    }

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'
    
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
    
            form.classList.add('was-validated')
        }, false)
        })
    })()

  return (
    <div className='addusers'>
        <h1>Add Users</h1>
        <form onSubmit={submitUser} className='needs-validation' noValidate>
            <div className="mb-3">
                <label htmlFor="emailInp" className="form-label">Email address</label>
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" className="form-control" id="emailInp" aria-describedby="emailHelp" placeholder='juan@gmail.com' required/>
                <div className="invalid-feedback">
                    Please enter a valid email address
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="passInp" className="form-label">Password</label>
                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type={passwordShown ? "text" : "password"} className="form-control" id="passInp" placeholder='********' autoComplete='true' required/>
                <span style={{cursor: "pointer"}} onClick={togglePassword}>{passwordShown ? "Hide password" : "Show password"}</span>
                <div className="invalid-feedback">
                    Please enter a valid password
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="confpassInp" className="form-label">Confirm Password</label>
                <input onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmpassword} type={passwordShown ? "text" : "password"} className="form-control" id="confpassInp" placeholder='********' autoComplete='true' required/>
                <div className="invalid-feedback">
                    Please confirm your password
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="accountTypeInp" className="form-label">Account Type</label>
                <select onChange={(e)=>{setAccountType(e.target.value)}} defaultValue={accountType} className="form-select" aria-label="Default select example" required>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    </div>
    )
} 

export default AddUsers