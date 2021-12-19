import React from 'react'
import './LoadMoreBtn.css'

const LoadMoreBtn = ({result, page,load, handleloadMore }) => {
  return (
    <>
    {
      result < 9 * (page - 1) ? "" :
      !load && <button className="social2__load_more_btn" onClick ={handleloadMore}>Load more</button>
    }

    </>
  )
}

export default LoadMoreBtn
