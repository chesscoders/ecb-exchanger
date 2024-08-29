const { parse } = require('csv-parse/sync');

const fetchLatestEuroExchangeRate = async () => {
  try {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

    const startDate = previousDate.toISOString().split('T')[0];
    const endDate = currentDate.toISOString().split('T')[0];

    const ecbApiUrl = `https://sdw-wsrest.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A`;
    const queryParams = new URLSearchParams({
      startPeriod: startDate,
      endPeriod: endDate,
      format: 'csvdata',
    });
    const apiUrl = `${ecbApiUrl}?${queryParams}`;

    const apiResponse = await fetch(apiUrl);
    if (!apiResponse.ok) {
      throw new Error(`Failed to fetch data: ${apiResponse.statusText}`);
    }

    const csvResponseData = await apiResponse.text();

    return parse(csvResponseData, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.error(`Error fetching exchange rate: ${error.message}`);
    throw error;
  }
};

module.exports = fetchLatestEuroExchangeRate;
