const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const findById = async (id) => {
  const [products] = await ProductsModel.findById(id);

  const errorMessage = { message: 'Product not found' };
  if (!products) {
    throw errorMessage;
  }

  return products;
};

module.exports = {
  getAll,
  findById,
};