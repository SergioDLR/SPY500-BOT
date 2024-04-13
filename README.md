# SPY500 - BOT

## Bot de twitter

### SPYBOT es un bot publica el precio del cedear spy500.

## Features

- Publishes the price every half hour to the Twitter account @syp500cedear
- Landing page at https://spy500.up.railway.app/
- At the end of the business day, it publishes the variation compared to the last price of the previous day.

## Tech

- Express and nodejs.
- Nunjucks for the landing page
- Node-cron to perform scheduled publications
- MongoDB to store the recorded values of the cedear.

## Installation

```sh
You will find a .env.example, rename the file and fill it with real values.
npm install
npm run start
your done ✨✨
```

## Next steps

```sh
Historical inquiry on the page: This feature would allow users to view historical data for a particular financial instrument, such as a stock or ETF. Users could specify a date range and view the instrument's price, volume, or other relevant data over that period.

Creation of a graph at the end of the month: This feature would automatically generate a graph showing the price movement of a financial instrument for the current month. The graph would be updated at the end of the trading month to reflect the closing price.
```
