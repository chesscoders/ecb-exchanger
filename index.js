const dailyExchangeRate = require('./src/fetch-exchange-rate-for-today');

module.exports = {
  dailyExchangeRate,
  daily: dailyExchangeRate, // Alias
};
