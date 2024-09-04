const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const exchanger = require('../index');

describe('Fetch exchange rate ONLY for today for a pair of currencies from ECB', () => {
  let fetchStub;

  // Stub before each test
  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');

    // Read the sample ECB data from a file
    const sampleData = fs.readFileSync(path.resolve(__dirname, 'sample-ecb-data.csv'), 'utf8');
    const mockResponse = { ok: true, text: () => Promise.resolve(sampleData) };

    // Set the resolved value of fetchStub
    fetchStub.resolves(mockResponse);
  });

  // Restore the stub after each test
  afterEach(() => {
    sinon.restore();
  });

  it('should throw an error if targetCurrency is not supported', async () => {
    try {
      await exchanger.today('BTC/EUR');
    } catch (error) {
      expect(error.message).to.equal('ECB does not support BTC');
    }
  });

  it('should throw an error if baseCurrency is not supported', async () => {
    try {
      await exchanger.today('EUR/BTC');
    } catch (error) {
      expect(error.message).to.equal('ECB does not support BTC');
    }
  });

  it('should correctly handle lowercase currency pairs', async () => {
    await exchanger.today('cad/usd');
    expect(exchanger.today).to.not.throw();
  });

  it('should return the correct exchange rate when baseCurrency is EUR', async () => {
    const result = await exchanger.today('USD/EUR');
    expect(result).to.equal(1.1162);
  });

  it('should return the correct exchange rate when targetCurrency is EUR', async () => {
    const result = await exchanger.today('EUR/USD');
    expect(result).to.equal(0.8959);
  });

  it('should return the correct exchange rate when currencies are not EUR', async () => {
    const result = await exchanger.today('USD/GBP');
    expect(result).to.equal(1.3219);
  });
});
