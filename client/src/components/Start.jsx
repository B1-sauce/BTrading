import React from 'react';
const Start = (props) => {
  return (
    <div className='start'>
      <h1>B Trading</h1>
      <div className='pic'>
        <h2>Investing for Everyone</h2>
      </div>
      <button className='getStart' onClick={()=>{props.setStart(false)}}>Get Start</button>
    </div>
  )
}

module.exports = Start;