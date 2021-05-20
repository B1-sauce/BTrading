const mongoose = require('mongoose');

const metadataSchema = mongoose.Schema({
  Symbol: String
})

const stockDataSchema = mongoose.Schema({
  MetaData: metadataSchema,
  MonthlyTimeSeries: {},
  openPrice: String
});

const StockData = mongoose.model('StockData', stockDataSchema);


module.exports = {
  StockData: StockData,
};