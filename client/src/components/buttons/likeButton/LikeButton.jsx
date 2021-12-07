import React from 'react'
import './LikeButton.css'
import {FavoriteBorder,Favorite} from '@material-ui/icons'
import { useSelector} from 'react-redux'

const LikeButton = ({isLike,handleLike,handleUnLike}) => {
  const {theme } = useSelector(state=>state)
  return (
    <>
    {
      isLike
    ?<Favorite onClick={handleUnLike} className="social2__like"/>
    :<FavoriteBorder onClick={handleLike}/>
  }
    </>
  )
}

export default LikeButton
