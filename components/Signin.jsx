import React from 'react';

function Signin() {
  return (
    <div className='signin'>
        <h5>Signin</h5>
        <form className='signinFrm'>
          <div className='mb-3'>
            <label htmlFor='emailinp' className='form-label'>Email</label>
            <input type='email' className='form-control' id='emailinp' placeholder='Enter email' />
          </div>
          <div className='mb-3'>
            <label htmlFor='passwordInp' className='form-label'>Password</label>
            <input type='password' className='form-control' id='passwordInp' placeholder='Enter password' />
          </div>
          <div className='mb-3'>
            <button type='submit' className='btn btn-primary'>Signin</button>
          </div>
        </form>
    </div>
    )
} 

export default Signin