import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../../styles/admin.css";
import { useNavigate } from 'react-router-dom';
import Navpills from "./Navpills";

function AddWords({hostaddress}) {

    let navigate = useNavigate();

    const [category, setCategory] = useState("fruits");
    const [word, setWord] = useState("");

    function submitWord(e) {
        e.preventDefault();
        axios.post('http://'+hostaddress+':80/startup-inspired-game/api/words.php', {
            category,
            word
        }).then(function(response) {
            alert(response.data.message);
            if (response.data.status == 1) {
                navigate("/admin/managewordbank");
            }
            
        });
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
    <div className='addwords'>
        <Navpills />
        <p className='fs-3 text-uppercase'>Add Word</p>
        <form onSubmit={submitWord} className='needs-validation' noValidate>
            <div className="mb-3">
                <label htmlFor="categoryInp" className="form-label">Category</label>
                <select onChange={(e)=>{setCategory(e.target.value)}} defaultValue={category} className="form-select" id='categoryInp' aria-label="Default select example" required>
                    <option value="fruits">fruits</option>
                    <option value="places">places</option>
                    <option value="names">names</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="emailInp" className="form-label">Word</label>
                <input onChange={(e)=>{setWord(e.target.value)}} value={word} type="text" className="form-control" id="wordInp" placeholder='apple' required/>
                <div className="invalid-feedback">
                    Please enter a valid word
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    </div>
    )
} 

export default AddWords