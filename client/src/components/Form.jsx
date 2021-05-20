import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons'

const Form = (props) => {
  const addToList = (e) => {
    props.setAdd(e.target.name)
    axios.get('/api/add', { params: { symbol: e.target.name } })
      .then((result) => {
        props.fetchdata()
        props.setDisplay(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  if (props.search && props.search.bestMatches) {
    return (
      <div className='formContainer'>
        <h1 className='slogan'>B Trading</h1>
        <img className='leftbackground' />
        <label name='search'></label>
        <input type='text' id="search" onChange={props.handleChange} onfocus="this.value=''"></input>
        <div className='searchResult'  >
          <ul className={props.display.toString()}>
            {
              props.search.bestMatches.map((item, index) => {
                return (
                  <li name={item['1. symbol']} key={index}>
                    <a name={item['1. symbol']} onClick={addToList}>{item['2. name']}</a>
                    <a name={item['1. symbol']} onClick={addToList}>{item['1. symbol']}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className='formContainer'>
        <h1 className='slogan'>B Trading</h1>
        <img className='leftbackground' />
        <label name='search'></label>
        <input type='text' id="search" onChange={props.handleChange} onfocus="this.value=''"></input>
      </div>
    )
  }
}

export default Form;