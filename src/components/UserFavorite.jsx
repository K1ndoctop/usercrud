import React from 'react'
import { useDispatch } from 'react-redux'
import { addToFavorites } from '../store/usersSlice'

const UserFavorite = ({user}) => {
  const dispatch = useDispatch()
  return (
    <>
      {user.favorites ? (
        <div onClick={ () => dispatch(addToFavorites({
          ...user,favorites:false
        }))}>
          <img src="https://img.freepik.com/premium-vector/heart-shape-stock-illustration_92497-42.jpg" alt="" width="20" height="20" />
        </div>
      ):(
        <div onClick={ () => dispatch(addToFavorites({
          ...user,favorites:true
        }))}>
          <img src="https://icon-library.com/images/white-heart-icon/white-heart-icon-23.jpg" alt="" width="20" height="20" />
        </div>
      )}
    </>
  )
}

export default UserFavorite