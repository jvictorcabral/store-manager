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

    it('é retornado o status 200', async () => {
      await ProductsController.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('é retornado o metodo json contendo um array', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    })
  });
});