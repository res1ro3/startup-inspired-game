import React, { useState } from 'react';
import axios from 'axios';
import '../styles/gameplay.css';

function Gameplay({ testvar }) {
  
  const [score, setScore] = useState(0);

  const checkAnswer = async (e) => {
    e.preventDefault();
    
    await axios.post('http://192.168.20.11:80/startup-inspired-game/api/wordbank.php', {
        category: 'fruits',
        word: answer
    }).then((res) => {
        console.log(res.data.message);
    })
  }

  return (
    <div className='home'>
        <h1>Gameplay Test</h1>
        <h5>{testvar}</h5>
        <div>
          <div id='scoreDiv' className='mb-3 bg-dark'>
            <h3>{score}</h3>
          </div>
          <form>
            <div className='mb-3 d-flex column-gap-3'>
              <input type="text" className='form-control' name="answerInp" id="answerInp" />
              <button onSubmit={checkAnswer} type="button" className="btn btn-dark">Submit</button>
            </div>
          </form>
        </div>
    </div>
    )
} 

export default Gameplay