import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const List = (props) => {
  const handleDelet = (e) => {
    axios.delete('/delete', {
      params: {
        id: props.data[Number(e.target.attributes[1].value)]['_id']
      }
    })
      .then(res => {
        props.fetchdata()
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => { props.fetchdata() })

  if (props.data) {
    return (
      <ul>
        {
          props.data.map((item, index) => {
            return (
              <li
                key={index}
                className='listItem'
                name={index}
              >
                <row>
                  <span
                    className='col-2'
                    name={index}
                    onClick={props.createGraph}>
                    {item["metaData"]["symbol"]}
                  </span>
                  <span className='col-7' name={index} onClick={props.createGraph}>
                  </span>
                  <span className='col-2'>${item.openPrice}</span>
                  <button
                    className='col-1'
                    onClick={handleDelet}
                    name={index}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} style={{ zIndex: -1 }} />
                  </button>
                </row>
              </li>
            )
          })
        }
      </ul>
    )
  }
}


export default List;