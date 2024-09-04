const { parse } = require('csv-parse/sync');
const dailyCache = require('./daily-exchange-rate-cache');
const fetchEcbData = require('./fetch-ecb-data');

const fetchLatestEuroExchangeRate = async () => {
  try {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

    const startDate = previousDate.toISOString().split('T')[0];
    const endDate = currentDate.toISOString().split('T')[0];

    // Check cache for the exchange rate and return early if it exists
    const cachedExchangeRate = dailyCache.get(startDate);
    if (cachedExchangeRate) {
      return cachedExchangeRate;
    }

    // Fetch the exchange rate from the ECB API
    const apiResponse = await fetchEcbData(startDate, endDate);
    if (!apiResponse.ok) {
      throw new Error(`Failed to fetch data: ${apiResponse.statusText}`);
    }

    const csvResponseData = await apiResponse.text();
    const exchangeRateData = parse(csvResponseData, { columns: true, skip_empty_lines: true });
    // Store the exchange rate in the cache
    dailyCache.set(startDate, exchangeRateData);
    return exchangeRateData;
  } catch (error) {
    console.error(`Error fetching exchange rate: ${error.message}`);
    throw error;
  }
};

module.exports = fetchLatestEuroExchangeRate;
