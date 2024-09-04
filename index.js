const fetchExchangeRateForToday = require('./src/fetch-exchange-rate-for-today');
const fetchLatestEuroExchangeRate = require('./src/fetch-latest-euro-exchange-rate');

module.exports = {
  fetchExchangeRateForToday,
  today: fetchExchangeRateForToday, // Alias
  fetchLatestEuroExchangeRate,
  latest: fetchLatestEuroExchangeRate, // Alias
};
