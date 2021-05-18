import React, { useState, useEffect } from 'react';

const List = (props) => {
  const { collaps, setCollaps } = useState(props);
  return (
    <ul>
      <li className='listItem'>abc</li>
      <li className='listItem'>abc</li>
      <li className='listItem'>abc</li>
      <li className='listItem'>abc</li>
      <li className='listItem'>abc</li>
      <li className='listItem'>abc</li>
      <li className='listItem'>abc</li>
    </ul>
  )
}

export default List;