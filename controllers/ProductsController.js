const ProductsService = require('../services/ProductsService');

const getAll = async (_req, res, next) => {
  try {
    const products = await ProductsService.getAll();

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const findById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const productById = await ProductsService.findById(id);

    return res.status(200).json(productById);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const addNewProduct = async (req, res, _next) => {
  try {
    const { name } = req.body;

    const newProduct = await ProductsService.addNewProduct(name);

    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const updateProduct = async (req, res, _next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const update = await ProductsService.updateProduct(name, id);

    return res.status(200).json(update);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const deleteProduct = async (req, res, _next) => {
  try {
    const { id } = req.params;

    await ProductsService.deleteProduct(id);

    return res.status(204).end();
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  findById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};