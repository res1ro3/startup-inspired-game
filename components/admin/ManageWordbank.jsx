import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navpills from "./Navpills";

function ManageWordbank({hostaddress}) {
    const [words, setWords] = useState([]);
    useEffect(() => {
        getWords();
    }, []);

    function getWords() {
        axios.get('http://'+hostaddress+':80/startup-inspired-game/api/words.php', {
            mode: 'cors',
        }).then(function(response) {
            setWords(response.data);
        });
        
    }

    function deleteWord(wordbank_id) {
        axios.post('http://'+hostaddress+':80/startup-inspired-game/api/delete.php', {
            wordbank_id,
            mode: 'cors',
            type: 'words'
        }).then(function(response) {
            alert(response.data.message);
            window.location.reload();
        });
        
    }

  return (
    <div className='managewordbank'>
        <Navpills />
        <p className='fs-3 text-uppercase'>Manage Wordbank</p>
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Word</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {words.map((word, key) =>
                        
                        <tr key={key}>
                            <th scope='row'>{key+1}</th>
                            <td>{word.category}</td>
                            <td>{word.word}</td>
                            <td>{word.is_answered == 0 ? "Not yet answered" : "Answered" }</td>
                            <td>
                                {/* <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link> */}
                                <button onClick={()=>deleteWord(word.wordbank_id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    </div>
    )
} 

export default ManageWordbank