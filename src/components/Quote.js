import React from "react"
import quote from '../img/quote.svg'

const Quote = (
  {fragment,
  authorContent,
  nameContent,
  locationContent,
  commentContent}
  ) => {
  return (
    <div className='excerpt_container'>
      <img className='quote_symbol' src={ quote } alt=""/>
      <div className='excerpt_block'>
        <div className='excerpt_info'>
          <p id='excerpt'>{fragment}</p>
          <p id='details'>
            {authorContent}; "{nameContent}", str. {locationContent}
          </p>
        </div>
        <div className='excerpt_process'>
          <div className='comment_block'>
            <p id='comment'>{commentContent}</p>
          </div>
          <p id='tags'></p>
        </div>
      </div>
    </div>
  )
}

export default Quote