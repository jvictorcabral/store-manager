const ProductsModel = require('../models/ProductsModel');

const errorWitchOutName = {
  status: 400,
  message: '"name" is required',
};

const errorLengthMustBe5 = {
  status: 422,
  message: '"name" length must be at least 5 characters long',
};

const errorNotFound = {
  status: 404,
  message: 'Product not found',
};

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const findById = async (id) => {
  const [products] = await ProductsModel.findById(id);

  if (!products) {
    throw errorNotFound;
  }

  return products;
};

const addNewProduct = async (name) => {
  if (!name) throw errorWitchOutName;
  if (name.length < 5) throw errorLengthMustBe5;

  const newProduct = await ProductsModel.addNewProduct(name);

  return newProduct;
};

const updateProduct = async (name, id) => {
  if (!name) throw errorWitchOutName;
  if (name.length < 5) throw errorLengthMustBe5;

  const [products] = await ProductsModel.findById(id);

  if (!products) {
    throw errorNotFound;
  }

  const update = await ProductsModel.updateProduct(name, id);

  console.log('service: ', update);

  return update;
};

const deleteProduct = async (id) => {
  const [products] = await ProductsModel.findById(id);

  if (!products) {
    throw errorNotFound;
  }

  const deletingProduct = await ProductsModel.deleteProduct(id);

  return deletingProduct;
};

module.exports = {
  getAll,
  findById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};