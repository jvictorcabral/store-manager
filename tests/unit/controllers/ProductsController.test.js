const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');
const sinon = require('sinon');
const { expect } = require('chai');

describe('ProductsController', () => {
  describe('getAll', () => {
    const response = {}
    const request = {}

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'getAll').resolves([]);
    })

    after(() => {
      ProductsService.getAll.restore();
    })

    it('deve retornar o "status" 200', async () => {
      await ProductsController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('deve retornar o metodo "json" contendo um array', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    })
  });

  describe('addNewProduct', () => {
    describe("quando é inserido com sucesso", async () => {
      const response = {};
      const request = {
        body: { name: 'abacate albino' },
      };

      beforeEach(() => {
        const result = {
          id: 1,
          name: 'abacate albino',
        }

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'addNewProduct').resolves(result);
      })
      afterEach(() => {
        ProductsService.addNewProduct.restore();
      })

      it('deve retornar o método "status" com o código 201', async () => {
        await ProductsController.addNewProduct(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      })

      it('deve retornar o método "json¨ passando um objeto', async () => {
        await ProductsController.addNewProduct(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.true;
      })
    });
  });
});