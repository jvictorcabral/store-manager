const express = require('express');
const ProductsController = require('./controllers/ProductsController');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.findById);
app.post('/products', ProductsController.addNewProduct);
app.put('/products/:id', ProductsController.updateProduct);
app.delete('/products/:id', ProductsController.deleteProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;