import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navpills from "./Navpills";

function ManageUsers({hostaddress}) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://'+hostaddress+':80/startup-inspired-game/api/user.php', {
            mode: 'cors',
        }).then(function(response) {
            setUsers(response.data);
        });
        
    }

    function deleteUser(uid) {
        axios.post('http://'+hostaddress+':80/startup-inspired-game/api/delete.php', {
            user_id: uid,
            mode: 'cors',
            type: 'users'
        }).then(function(response) {
            alert(response.data.message);
            window.location.reload();
        });
        
    }

  return (
    <div className='manageusers'>
        <Navpills />
        <p className='fs-3 text-uppercase'>Manage Users</p>
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Password</th>
                    <th scope='col'>Account Type</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, key) =>
                        
                        <tr key={key}>
                            <th scope='row'>{key+1}</th>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.account_type}</td>
                            <td>
                                {/* <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link> */}
                                <button onClick={()=>deleteUser(user.user_id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    </div>
    )
} 

export default ManageUsers