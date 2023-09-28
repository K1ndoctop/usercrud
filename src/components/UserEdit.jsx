import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser, clearOneUserState } from "../store/usersSlice";
import { saveChanges } from "../store/usersSlice";

const UserEdit = () => {
  const { oneUser } = useSelector((state) => state.users);
  const [user, setUser] = useState(oneUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUser(id));
    return () => dispatch(clearOneUserState());
  }, []);

  useEffect(() => {
    if (oneUser) {
      setUser(oneUser);
    }
  }, [oneUser]);

  console.log(oneUser);

  return (
    <>
      {user ? (
        <div>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />

          <input
            type="text"
            placeholder="Position"
            onChange={(e) => setUser({ ...user, position: e.target.value })}
            value={user.position}
          />

          <input
            type="text"
            placeholder="Expirience"
            onChange={(e) => setUser({ ...user, expirience: e.target.value })}
            value={user.expirience}
          />

          <button onClick={()=>{
            dispatch(saveChanges(user))
            navigate('/')
          }}>Save Changes</button>
        </div>
      ) : (
        <h3>Loading.....</h3>
      )}
    </>
  );
};

export default UserEdit;
