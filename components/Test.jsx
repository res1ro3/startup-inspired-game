import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import Gameplay from './Gameplay';

let nextId = 0;

function Test() {
    const [newword, setNewword] = useState('');
    const [wordbank, setWordbank] = useState([]);
    
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [statusCheck, setStatusCheck] = useState("");

    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:00:00");

    const [testvar, setTestvar] = useState("Hi Test");

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('00:01:00');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }

    useEffect(() => {
        // clearTimer(getDeadTime());
    }, []);

    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    const removeWord = (x) => {
        setWordbank(
            wordbank.filter(value => value.name !== x)
        )
    }

    const check = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:80/startup-inspired-game/api/wordbank.php', {
            category: 'fruits',
            word: answer
        }).then((res) => {
            console.log(res.data.message);
        })

        var checker = wordbank.filter(value => value.name === answer);
        if (checker.length > 0) {
            setScore(score + 1);
            setStatusCheck("Correct!");
            removeWord(answer);
        } else {
            setStatusCheck("Incorrect!");
        }
    }

    const resetAnswers = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:80/startup-inspired-game/api/reset.php')
        .then((res) => {
            console.log(res);
        })
    }

  return (
    <div className='test'>
        <div>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input
                    value={newword}
                    onChange={e => setNewword(e.target.value)}
                />
                <button onClick={() => {
                    setWordbank([
                    ...wordbank,
                    { id: nextId++, name: newword }
                    ]);
                }}>Add</button>
                <ul>
                    {wordbank.map(artist => (
                    <li key={artist.id}>{artist.name}</li>
                    ))}
                </ul>
            </form>
        </div>
        
        <div className='timerdiv'>
            <h2>{timer}</h2>
            <button onClick={onClickReset}>Reset</button>
        </div>
        <div className='scorediv'>
            <h1>Your Score: {score}</h1>
        </div>
        <form onSubmit={check}>
            <div className='mb-3'>
                <input onChange={(e) => setAnswer(e.target.value)} className='form-control' type="text" name="answerInp" id="answerInp" placeholder='Enter answer' />
                <span>{statusCheck}</span>
            </div>
            <div className='mb-3'>
                <button type="submit">Submit</button>
            </div>
        </form>

        <button onClick={resetAnswers}>RESET ANSWERS</button>
        <Gameplay testvar={timer} />
    </div>
    )
} 

export default Test