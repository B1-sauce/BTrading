const model = require('./schema.js');
const Graph = model.StockGraph;
const Data = model.StockData;
const db = require('./index.js');
const axios = require('axios');

const handleFetchDB = (req, res) => {
  Data.find({})
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const handleAddToList = (req, res) => {
  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${req.query.symbol}&apikey=881PBDQGW4O8VH5N`)
    .then((result) => {
      let openArr = [];
      for (var key in result.data['Monthly Time Series']) {
        for (var k in result.data['Monthly Time Series'][key]) {
          let newKey = k.slice(3, k.length);
          result.data['Monthly Time Series'][key][newKey] = result.data['Monthly Time Series'][key][k];
          if (k === '1. open') {
            openArr.push(result.data['Monthly Time Series'][key][k])
          }
          delete result.data['Monthly Time Series'][key][k];
        }
      }
      const meta = {
        symbol: result.data['Meta Data']['2. Symbol']
      }
      const newGraph = {
        metaData: meta,
        MonthlyTimeSeries: result.data['Monthly Time Series'],
        openPrice: openArr[0]
      }
      const newData = {
        metaData: meta,
        openPrice: openArr[0]
      }
      Data.collection.insertOne(newGraph, (err, result) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(result)
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
}

const handleGetFromAPI = (req, res) => {
  axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.query.keywords}&apikey=A9RYWYYB1H5EC7XQ`)
    .then(result => {
      res.status(200).send(result.data)
    })
    .catch(err => {
      console.log(err)
    })
};

const handleDelet = (req, res) => {
  console.log(`ObjectId("${req.query.id}")`)
  Data.findByIdAndDelete(req.query.id, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("Deleted : ", docs);
    }
  });
}

module.exports = {
  handleFetchDB: handleFetchDB,
  handleAddToList: handleAddToList,
  handleGetFromAPI: handleGetFromAPI,
  handleDelet: handleDelet
};