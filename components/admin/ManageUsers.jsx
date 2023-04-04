import React, { useState, useEffect } from 'react';
import axios from "axios";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/startup-inspired-game/api/user.php', {
            mode: 'cors',
        }).then(function(response) {
            console.log(response);
            setUsers(response.data);
        });
        
    }

  return (
    <div className='manageusers'>
        <h1>Manage Users</h1>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Account Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.user_id}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.account_type}</td>
                            <td>
                                {/* <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link> */}
                                <button>Delete</button>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    </div>
    )
} 

export default ManageUsers