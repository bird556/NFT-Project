const express = require('express');
const router = express.Router();
const { nft } = require('../controllers/nftController');

router.post('/', nft);

module.exports = router;
