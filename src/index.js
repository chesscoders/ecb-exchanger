const fetchExchangeRateForToday = require('./fetch-exchange-rate-for-today');
const fetchLatestEuroExchangeRate = require('./fetch-latest-euro-exchange-rate');
const supportedCurrencyCodes = require('./supported-currency-codes');

module.exports = {
  fetchExchangeRateForToday,
  fetchLatestEuroExchangeRate,
  supportedCurrencyCodes,
};
