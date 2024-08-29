# ECB Exchange Rates

The ECB Exchange Rates package provides exchange rate lookups courtesy of the European Central Bank

## Installation

To add this package to your project, run:

```sh
npm i ecb-exchange-rates
# or, using Yarn
yarn add ecb-exchange-rates
```

## Features

- Fetch exchange rates for any currency pair supported by the European Central Bank ONLY for today

## Usage

```js
import { daily } from 'daily-exchange-rates';

const USD_EUR = await daily('USD/EUR');
// outputs: 0.8959
const EUR_USD = await daily('EUR/USD');
// outputs: 1.1162
const CAD_USD = await daily('CAD/USD');
// outputs: 0.7428
```

## Contributing

We welcome contributions to improve ECB Exchange Rates. Please feel free to submit pull requests or report issues via the [GitHub repository](https://github.com/chesscoders/daily-exchange-rates).

## License

ECB Exchange Rates is licensed under the MIT License. See the LICENSE file for more details.
