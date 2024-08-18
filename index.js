const axios = require('axios');
const dotenv = require('dotenv');


dotenv.config();

// Replace with your Alpha Vantage API key
const apiKey = process.env.API_KEY;
const symbol = 'AAPL'; // Replace with the stock symbol you want to get the price for

const getStockPrice = async (symbol) => {
    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;
        const response = await axios.get(url);
        const data = response.data;

        if (data['Information']) {
            console.error('API call frequency exceeded. Please try again later.');
            return;
        }
        // console.log('data:', data);

        const timeSeries = data['Time Series (1min)'];
        // console.log('timeSeries:', timeSeries);
        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTimestamp];
        const price = latestData['1. open'];

        console.log(`The latest price of ${symbol} at ${latestTimestamp} is $${price}`);
    } catch (error) {
        console.error('Error fetching stock price:', error);
    }

    // setTimeout(async () => {
    //     await getStockPrice(symbol);
    // }, [1000]);
};

getStockPrice(symbol);
