const { expect } = require('chai');
const dailyCache = require('../src/daily-exchange-rate-cache');

describe('dailyCache', () => {
  beforeEach(() => {
    // Clear the cache before each test
    dailyCache.cache = {};
  });

  it('should return the correct cached value', () => {
    const date = '2024-08-27';
    const exchangeRateData = 'EXR.D.AUD.EUR.SP00.A,D,AUD,EUR,SP00,A,2024-08-27,1.6461...';

    // Set the cache
    dailyCache.set(date, exchangeRateData);

    // Get the cached value
    const cachedValue = dailyCache.get(date);

    // Assert the cached value is correct
    expect(cachedValue).to.equal(exchangeRateData);
  });

  it('should store the value correctly', () => {
    const date = '2024-08-28';
    const exchangeRateData = 'EXR.D.AUD.EUR.SP00.A,D,AUD,EUR,SP00,A,2024-08-27,1.6407';

    // Set the cache
    dailyCache.set(date, exchangeRateData);

    // Assert the cache contains the value
    expect(dailyCache.get(date)).to.equal(exchangeRateData);
  });
});
