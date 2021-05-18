import React, { useState, useEffect } from 'react';
import List from './List.jsx'

const App = (props) => {
  const { collaps, setCollaps } = useState('true')
  return (
    <div>
      <nav>
        <span></span>
        <p>Investing for Everyone</p>
      </nav>
      <div class='container page-1'>
        <div className='row'>
          <div class='col-4'>
            <h1>Bee Trading</h1>
            <img class='leftbackground' />
            <label name='search'></label>
            <input type='text'></input>
          </div>
          <div class='col-8'>
            <div className='container page-1-list'>
              <List onClick={setCollaps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;