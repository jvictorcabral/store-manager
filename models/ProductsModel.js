const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.query('SELECT * FROM products;');

  return products;
};

const findById = async (id) => {
  const [products] = await connection.query('SELECT * FROM products WHERE id = ?;', [id]);

  return products;
};

const addNewProduct = async (name) => {
  const [{ insertId }] = await connection.query(`
    INSERT INTO products (name)
      VALUES (?)`,
    [name]);
  
  const newProduct = {
    id: insertId,
    name,
  };

  return newProduct;
};

module.exports = {
  getAll,
  findById,
  addNewProduct,
};