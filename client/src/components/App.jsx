import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import Detail from './Detail.jsx';
import Form from './Form.jsx';
import Start from './Start.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft, faCommentsDollar } from '@fortawesome/free-solid-svg-icons'


const App = (props) => {
  const [start, setStart] = useState(true)
  const [collaps, setCollaps] = useState(true)
  const [data, setData] = useState([])
  const [search, setSearch] = useState(null)
  const [display, setDisplay] = useState(true)
  const [add, setAdd] = useState('')
  const [graghIndex, setGraghIndex] = useState(null)
  const [graph, setGraph] = useState({})

  const fetchdata = () => {
    axios.get('/data')
      .then((result) => {
        setData(result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const createGraph = (e) => {
    setCollaps(!collaps);
    setGraghIndex(Number(e.target.attributes[1].value))
    let stockChartXValues = [];
    let stockChartYValues = [];
    for (var key in data[Number(e.target.attributes[1].value)]['MonthlyTimeSeries']) {
      stockChartXValues.push(key);
      stockChartYValues.push(data[Number(e.target.attributes[1].value)]['MonthlyTimeSeries'][key].open);
    }
    setGraph({
      xvalue: stockChartXValues,
      yvalue: stockChartYValues
    })
    console.log('set graph')
  }

  const handleChange = (e) => {
    axios.get('/api/data', { params: { keywords: e.target.value } })
      .then(result => {
        setSearch(result.data)
        setDisplay(true)
      })
      .catch(err => {
        console.log(err)
      })
  }
  // useEffect(() => { fetchdata() })

  if (collaps && data !== null && !start) {
    return (
      <div>
        <nav>
          <button className='home' onClick={() => setStart(!start)}><FontAwesomeIcon icon={faCommentsDollar} /></button>
          <p>Investing for Everyone</p>
        </nav>
        <div className='container page-1'>
          <div className='row'>
            <div className='col-4'>
              <Form
                handleChange={handleChange}
                search={search}
                display={display}
                setDisplay={setDisplay}
                add={add}
                setAdd={setAdd}
                setData={setData}
                fetchdata={fetchdata} />
            </div>
            <div className='col-8'>
              <div className='container page-1-list'>
                <List
                  setCollaps={setCollaps}
                  collaps={collaps}
                  data={data}
                  createGraph={createGraph}
                  fetchdata={fetchdata}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (!collaps && data !== null && !start) {
    return (
      <div className='page-2'>
        <nav>
          <button onClick={() => setCollaps(!collaps)} className='back'><FontAwesomeIcon icon={faHandPointLeft} /></button>
          <p>Investing for Everyone</p>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <Detail graph={graph} />
            </div>
          </div>
        </div>
      </div>
    )
  } else if (start) {
    return (
      <Start setStart={setStart} />
    )
  } else {
    return (
      <div>Loading</div>
    )
  }

}

export default App;