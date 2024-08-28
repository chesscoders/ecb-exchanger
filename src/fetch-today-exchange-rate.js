const acceptedCurrencies = require('./accepted-currencies');
const fetchEuroExchangeRate = require('./fetch-euro-exchange-rate');

/**
 * Fetches and calculates the exchange rate for a given currency pair ONLY for today.
 *
 * @param {string} pair - The currency pair in the format 'TARGET/BASE', e.g., 'USD/EUR'.
 * @returns {Promise<number>} - The exchange rate, rounded to 4 decimal places.
 * @throws {Error} - Throws an error if either the target or base currency is not supported by the ECB.
 */
const fetchTodayExchangeRate = async (pair) => {
  // Parse pair
  const [targetCurrency, baseCurrency] = pair.split('/');

  // Validate currencies
  if (!acceptedCurrencies.includes(targetCurrency)) {
    throw new Error(`ECB does not support ${targetCurrency}`);
  }
  if (!acceptedCurrencies.includes(baseCurrency)) {
    throw new Error(`ECB does not support ${baseCurrency}`);
  }

  // Fetch exchange rate data from ECB
  const data = await fetchEuroExchangeRate();

  // If EUR is the base currency, return the exchange rate as is
  if (baseCurrency === 'EUR') {
    const value = data.find((record) => record.CURRENCY === targetCurrency).OBS_VALUE;
    // Round to exactly 4 decimal places
    return round(value);
  }

  // Otherwise, calculate the exchange rate
  const euroRate = data.find((record) => record.CURRENCY === baseCurrency).OBS_VALUE;
  const targetRate = data.find((record) => record.CURRENCY === targetCurrency).OBS_VALUE;

  // Round to exactly 4 decimal places
  return round(targetRate / euroRate);
};

const round = (value, decimals = 4) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

module.exports = fetchTodayExchangeRate;
