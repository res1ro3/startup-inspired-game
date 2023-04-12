import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/gameplay.css';

function Gameplay({ hostaddress }) {
  const { gid } = useParams();
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");

  const checkAnswer = async (e) => {
    e.preventDefault();

    await axios.post('http://'+hostaddress+':80/startup-inspired-game/api/response.php', {
        category: 'fruits',
        word: answer,
        email: localStorage.getItem('user')
    }).then((res) => {
        console.log(res.data.message);
    })
  }

  return (
    <div className='home'>
        <h1>GuessIT Game #{gid}</h1>
        <div>
          <div id='scoreDiv' className='mb-3 bg-dark'>
            <h3>{score}</h3>
          </div>
          <form>
            <div className='mb-3 d-flex column-gap-3'>
              <input onChange={(e)=>setAnswer(e.target.value)} value={answer} type="text" className='form-control' name="answerInp" id="answerInp" />
              <button onSubmit={checkAnswer} type="button" className="btn btn-dark">Submit</button>
            </div>
            <p>{answer}</p>
          </form>
        </div>
    </div>
    )
} 

export default Gameplay