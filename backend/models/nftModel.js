const mongoose = require('mongoose');

const nftSchema = mongoose.Schema(
  {
    nft_name: {
      type: String,
      required: [true, 'Please add NFT name'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      unique: true,
    },
    currency: {
      type: String,
      required: [true, 'Please add currency'],
      unique: true,
    },
    owner: {
      type: String,
      required: [true, 'Please add Owner'],
      default: false,
    },
    favorites: {
      type: Number,
      default: null,
    },
    views: {
      type: Number,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    chain: {
      type: String,
      default: 'Ethereum',
    },
    contract_address: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('NFT', nftSchema);
