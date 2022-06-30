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
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  findById,
};