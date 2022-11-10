const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const colors = require('colors');
const connectDB = require('./congfig/db');

// Connect to Mongo database
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.json({
    NFTS: {
      img: 'google.com',
      price: 500,
    },
  });
});

// NFT ROUTE
app.use('/nft', require('./routes/nftRoutes'));

app.listen(PORT, () => console.log(`Hello from PORT ${PORT}`));
