import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/gameplay.css';

function Gameplay({ hostaddress }) {
  const { gid } = useParams();
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [gamedata, setGamedata] = useState([]);
  const [statusCheck, setStatusCheck] = useState("");

  function getGameData() {
    axios.post('http://'+hostaddress+':80/startup-inspired-game/api/getgamedata.php', {
        mode: 'cors',
        game_id: gid
    }).then(function(response) {
        setGamedata(response.data);
    });
  }

  const getScore = async () => {
    await axios.post('http://'+hostaddress+':80/startup-inspired-game/api/score.php',{
        email: localStorage.getItem("user"),
        game_id: gid,
        category: gamedata.category
    })
    .then((res) => {
        setScore(res.data);
    })
} 

  useEffect(()=>{
    getGameData();
    getScore();
  }, [])

  const checkAnswer = async (e) => {
    e.preventDefault();

    await axios.post('http://'+hostaddress+':80/startup-inspired-game/api/response.php', {
        category: gamedata.category,
        word: answer,
        email: localStorage.getItem('user')
    }).then((res) => {
        setStatusCheck(res.data.message);
    })
    getScore();
  }

  return (
    <div className='home'>
        <h1>GuessIT Game #{gid}</h1>
        <h1 className='fs-3 mb-3'>Category: "{gamedata.category}"</h1>
        <div>
          <div id='scoreDiv' className='mb-3 bg-dark'>
            <h3>{score}</h3>
          </div>
          <form onSubmit={checkAnswer}>
            <div className='mb-3 d-flex column-gap-3'>
              <input onChange={(e)=>setAnswer(e.target.value)} value={answer} type="text" className='form-control' name="answerInp" id="answerInp" />
              <button type="submit" className="btn btn-dark">Submit</button>
            </div>
            <span>{statusCheck}</span>
          </form>
        </div>
    </div>
    )
} 

export default Gameplay