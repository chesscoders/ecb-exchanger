const { expect } = require('chai');
const fetchExchangeRateForToday = require('../src/fetch-exchange-rate-for-today');
const fetchLatestEuroExchangeRate = require('../src/fetch-latest-euro-exchange-rate');
const sinon = require('sinon');

describe('Fetch exchange rate ONLY for today for a pair of currencies from ECB', () => {
  let fetchStub;

  // Stub fetchLatestEuroExchangeRate before each test
  beforeEach(() => {
    fetchStub = sinon.stub(fetchLatestEuroExchangeRate, 'apply');
  });

  // Restore the stub after each test
  afterEach(() => {
    sinon.restore();
  });

  it('should throw an error if targetCurrency is not supported', async () => {
    try {
      await fetchExchangeRateForToday('BTC/EUR');
    } catch (error) {
      expect(error.message).to.equal('ECB does not support BTC');
    }
  });

  it('should throw an error if baseCurrency is not supported', async () => {
    try {
      await fetchExchangeRateForToday('EUR/BTC');
    } catch (error) {
      expect(error.message).to.equal('ECB does not support BTC');
    }
  });

  it('should return the correct exchange rate when baseCurrency is EUR', async () => {
    const data = [{ CURRENCY: 'USD', OBS_VALUE: 1.1155, TIME_PERIOD: '2023-10-01' }];
    const callback = fetchStub.resolves(data);

    const result = await fetchExchangeRateForToday('USD/EUR', callback);
    expect(result).to.equal(1.1155);
  });

  it('should return the correct exchange rate when targetCurrency is EUR', async () => {
    const data = [{ CURRENCY: 'USD', OBS_VALUE: 1.1155, TIME_PERIOD: '2023-10-01' }];
    const callback = fetchStub.resolves(data);

    const result = await fetchExchangeRateForToday('EUR/USD', callback);
    expect(result).to.be.closeTo(0.8965, 0.0001);
  });

  it('should return the correct exchange rate when currencies are not EUR', async () => {
    const data = [
      { CURRENCY: 'USD', OBS_VALUE: 1.1155, TIME_PERIOD: '2023-10-01' },
      { CURRENCY: 'GBP', OBS_VALUE: 0.8299, TIME_PERIOD: '2023-10-01' },
    ];
    const callback = fetchStub.resolves(data);

    const result = await fetchExchangeRateForToday('USD/GBP', callback);
    expect(result).to.be.closeTo(1.3441, 0.0001);
  });
});
