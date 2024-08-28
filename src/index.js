const acceptedCurrencies = require('./accepted-currencies');
const fetchEuroExchangeRate = require('./fetch-euro-exchange-rate');
const fetchTodayExchangeRate = require('./fetch-today-exchange-rate');

module.exports = {
  acceptedCurrencies,
  fetchEuroExchangeRate,
  fetchTodayExchangeRate,
};
