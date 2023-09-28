import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserItem = ({ user }) => {
    const navigate = useNavigate();

  return (
    <li>
        <p>{user.name}</p>
        <p>{user.position}</p>
        <p>{user.expirience}</p>
        <button onClick={() => navigate(`/details/${user.id}`)}>Details</button>
    </li>
  )
}

export default UserItem