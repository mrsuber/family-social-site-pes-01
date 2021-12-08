import React from 'react'
import {PostCardHeader, PostCardBody, PostCardFooter,Comments, InputComments} from '../../../../components'


const PorfilePostCard = ({post}) => {

  return (

    <div  className="social2_post_card_wrapper">
    <PostCardHeader post={post}/>
    <PostCardBody post={post} />
    <PostCardFooter post={post}/>
    <Comments post={post}/>
    <InputComments post={post}/>
    </div>

  )
}

export default PorfilePostCard
