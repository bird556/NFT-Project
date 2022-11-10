const asyncHandler = require('express-async-handler');

// @desc Add NFT Info
// @route /nft
// @access Public
const nft = asyncHandler(async (req, res) => {
  const data = req.body;
  res.send('NFT From Controller');
});

module.exports = {
  nft,
};
