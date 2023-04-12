import axios from 'axios';
import React, {useEffect, useState} from 'react';

function Home() {

  const [gamelist, setGamelist] = useState([]);

  const getGames = async () => {
    await axios.get('http://localhost:80/startup-inspired-game/api/games.php')
    .then((res) => {
      setGamelist(res.data);
    })
  }
  useEffect(() => {
    getGames();
  },[])
  return (
    <div className='home'>
        <h1>Startup Inspired Game</h1>
        <div className='row mt-5'>
          {gamelist.map((game) => {
            return (
              <div className="col-sm" key={game.game_id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Game {game.game_id}</h5>
                    <p className="card-text">Category: {game.category}</p>
                    <p className="card-text">Started: {game.is_started}</p>
                    <a href="/test" className="btn btn-primary">Join</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    </div>
    )
} 

export default Home