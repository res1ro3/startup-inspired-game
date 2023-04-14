import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navpills from "./Navpills";
import "../../styles/admin.css";

function ManageGames({hostaddress}) {
    const [games, setGames] = useState([]);
    useEffect(() => {
        getGames();
    }, []);

    function getGames() {
        axios.get('http://'+hostaddress+':80/startup-inspired-game/api/games.php', {
            mode: 'cors',
        }).then(function(response) {
            setGames(response.data);
        });
        
    }

    function startGame(gameId) {
        axios.post('http://'+hostaddress+':80/startup-inspired-game/api/manage.php', {
            game_id: gameId,
            mode: 'cors',
            type: 'start-stop'
        }).then(function(response) {
            alert(response.data.message);
            window.location.reload();
        });
        
    }

    function deleteGame(gameId) {
        axios.post('http://'+hostaddress+':80/startup-inspired-game/api/delete.php', {
            game_id: gameId,
            mode: 'cors',
            type: 'games'
        }).then(function(response) {
            alert(response.data.message);
            window.location.reload();
        });
        
    }

  return (
    <div className='managegames'>
        <Navpills />
        <p className='fs-3 text-uppercase'>Manage Games</p>
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Game ID</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Status</th>
                    <th scope='col' className='col-span-2'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {games.map((game, key) =>
                        
                        <tr key={key}>
                            <th scope='row'>{key+1}</th>
                            <td>{game.game_id}</td>
                            <td>{game.category}</td>
                            <td>{game.is_started == 0 ? "Not yet started" : "Started" }</td>
                            <td className='action-td'>
                                <button onClick={()=>startGame(game.game_id)} className='btn btn-success'>{game.is_started ?  "Stop" : "Start"}</button>
                                <button onClick={()=>deleteGame(game.game_id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    </div>
    )
} 

export default ManageGames