const { expect } = require('chai');
const { stub, restore } = require('sinon');
const { fetchTodayExchangeRate, fetchEuroExchangeRate } = require('../src');

describe('Fetch exchange rate ONLY for today for a pair of currencies from ECB', () => {
  let fetchStub;
  beforeEach(() => {
    fetchStub = stub(fetchEuroExchangeRate, 'apply');
  });

  // Add a afterEach hook to restore the fetchEuroExchangeRate stub
  afterEach(() => {
    restore();
  });

  it('should throw an error if targetCurrency is not supported', async () => {
    try {
      await fetchTodayExchangeRate('BTC/EUR');
    } catch (error) {
      expect(error.message).to.equal('ECB does not support BTC');
    }
  });

  it('should throw an error if baseCurrency is not supported', async () => {
    try {
      await fetchTodayExchangeRate('EUR/BTC');
    } catch (error) {
      expect(error.message).to.equal('ECB does not support BTC');
    }
  });

  it('should return the correct exchange rate when baseCurrency is EUR', async () => {
    const data = [{ CURRENCY: 'USD', OBS_VALUE: 1.1155, TIME_PERIOD: '2023-10-01' }];
    fetchStub.resolves(data);

    const result = await fetchTodayExchangeRate('USD/EUR');
    expect(result).to.equal(1.1155);
  });

  it('should return the correct exchange rate when baseCurrency is not EUR', async () => {
    const data = [
      { CURRENCY: 'USD', OBS_VALUE: 1.1155, TIME_PERIOD: '2023-10-01' },
      { CURRENCY: 'GBP', OBS_VALUE: 0.8299, TIME_PERIOD: '2023-10-01' },
    ];
    fetchStub.resolves(data);

    const result = await fetchTodayExchangeRate('USD/GBP');
    expect(result).to.equal(1.3251);
  });
});
