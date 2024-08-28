const { parse } = require('csv-parse/sync');

const fetchEuroExchangeRate = async () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format date yyyy-MM-dd
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Fetch exchange rate data from ECB for today
  const baseUrl = `https://sdw-wsrest.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A`;
  const params = new URLSearchParams({
    startPeriod: formatDate(yesterday),
    endPeriod: formatDate(today),
    format: 'csvdata',
  });
  const response = await fetch(`${baseUrl}?${params}`);
  const csvData = await response.text();

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
};

module.exports = fetchEuroExchangeRate;
