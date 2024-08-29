const fetchLatestEuroExchangeRate = require('./fetch-latest-euro-exchange-rate');
const supportedCurrencyCodes = require('./supported-currency-codes');

/**
 * Fetches and calculates the exchange rate for a given currency pair ONLY for today.
 *
 * @param {string} currencyPair - The currency pair in the format 'TARGET/BASE', e.g., 'USD/EUR'.
 * @param {Function} [customFetcher=getEuroExchangeRates] - Optional custom fetcher function.
 * @returns {Promise<number>} - The exchange rate, rounded to 4 decimal places.
 * @throws {Error} - Throws an error if either the target or base currency is not supported by the ECB.
 */
const fetchExchangeRateForToday = async (
  currencyPair,
  customFetcher = fetchLatestEuroExchangeRate
) => {
  // Parse and validate currency pair
  const [targetCurrencyCode, baseCurrencyCode] = currencyPair.split('/');
  validateCurrencies([targetCurrencyCode, baseCurrencyCode]);

  // Fetch exchange rate data
  const exchangeRateData = await customFetcher();

  // Calculate exchange rate based on the currency pair
  if (baseCurrencyCode === 'EUR') {
    return roundToDecimal(findExchangeRate(exchangeRateData, targetCurrencyCode));
  }

  if (targetCurrencyCode === 'EUR') {
    return roundToDecimal(1 / findExchangeRate(exchangeRateData, baseCurrencyCode));
  }

  // Calculate indirect exchange rate when neither currency is EUR
  const euroToBaseRate = findExchangeRate(exchangeRateData, baseCurrencyCode);
  const euroToTargetRate = findExchangeRate(exchangeRateData, targetCurrencyCode);

  return roundToDecimal(euroToTargetRate / euroToBaseRate);
};

/**
 * Validates that all given currencies are supported by the ECB.
 * @param {string[]} currencies - Array of currency codes to validate.
 * @throws {Error} - Throws an error if a currency is not supported.
 */
const validateCurrencies = (currencies) => {
  currencies.forEach((currency) => {
    if (!supportedCurrencyCodes.includes(currency)) {
      throw new Error(`ECB does not support ${currency}`);
    }
  });
};

/**
 * Finds the exchange rate for a specific currency from the data.
 * @param {Object[]} exchangeRateData - Array of exchange rate records.
 * @param {string} currencyCode - The currency code to find the rate for.
 * @returns {number} - The exchange rate for the specified currency.
 */
const findExchangeRate = (exchangeRateData, currencyCode) => {
  const record = exchangeRateData.find((record) => record.CURRENCY === currencyCode);
  if (!record) {
    throw new Error(`Exchange rate for ${currencyCode} not found`);
  }
  return parseFloat(record.OBS_VALUE);
};

/**
 * Rounds a number to the specified number of decimal places.
 * @param {number} value - The value to round.
 * @param {number} [decimals=4] - The number of decimal places.
 * @returns {number} - The rounded value.
 */
const roundToDecimal = (value, decimals = 4) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

module.exports = fetchExchangeRateForToday;
