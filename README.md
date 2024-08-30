# ECB Exchanger

The ECB Exchanger package provides exchange rate lookups courtesy of the European Central Bank

## Installation

To add this package to your project, run:

```sh
npm i ecb-exchanger
# or, using Yarn
yarn add ecb-exchanger
```

## Features

- Fetch exchange rates for any currency pair supported by the European Central Bank ONLY for today
- Optimise the process of fetching results from the ECB by caching daily exchange rates

## Usage

```js
import exchanger from 'ecb-exchanger';

const USD_EUR = await exchanger.today('USD/EUR');
// outputs: 0.8959
const EUR_USD = await exchanger.today('EUR/USD');
// outputs: 1.1162
const CAD_USD = await exchanger.today('CAD/USD');
// outputs: 0.7428
```

## Contributing

We welcome contributions to improve ECB Exchanger. Please feel free to submit pull requests or report issues via the [GitHub repository](https://github.com/chesscoders/ecb-exchanger).

## License

ECB Exchanger is licensed under the MIT License. See the LICENSE file for more details.
