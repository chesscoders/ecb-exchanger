const fetchExchangeRateForToday = require('./src/fetch-exchange-rate-for-today');

module.exports = {
  fetchExchangeRateForToday,
  today: fetchExchangeRateForToday, // Alias
};
