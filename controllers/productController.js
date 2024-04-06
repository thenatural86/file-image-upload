const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {
  res.send('Create Products')
}

const getAllProducts = async (req, res) => {
  res.send('Get all products')
}

module.exports = { createProduct, getAllProducts }
