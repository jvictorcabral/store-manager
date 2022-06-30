const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products;');

  return products;
};

const findById = async (id) => {
  const [products] = await connection.execute('SELECT * FROM products WHERE id = ?;', [id]);

  return products;
};

module.exports = {
  getAll,
  findById,
};