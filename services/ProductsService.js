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

const addNewProduct = async (name) => {
  const errorWitchOutName = {
    status: 400,
    message: '"name" is required',
  };

  const errorLengthMustBe5 = {
    status: 422,
    message: '"name" length must be at least 5 characters long',
  };

  if (!name) throw errorWitchOutName;
  if (name.length < 5) throw errorLengthMustBe5;

  const newProduct = await ProductsModel.addNewProduct(name);

  return newProduct;
};

module.exports = {
  getAll,
  findById,
  addNewProduct,
};