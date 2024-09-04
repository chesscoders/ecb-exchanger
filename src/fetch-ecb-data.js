const fetchEcbData = async (startDate, endDate) => {
  const ecbApiUrl = `https://sdw-wsrest.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A`;
  const queryParams = new URLSearchParams({
    startPeriod: startDate,
    endPeriod: endDate,
    format: 'csvdata',
  });

  return await fetch(`${ecbApiUrl}?${queryParams}`);
};

module.exports = fetchEcbData;
