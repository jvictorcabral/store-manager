const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');
const sinon = require('sinon');
const { expect } = require('chai');

describe('ProductsService', () => {
  describe('getAll', () => {
    describe('quando não possui nenhum produto no banco de dados', () => {
      before(() => {
        sinon.stub(ProductsModel, 'getAll')
          .resolves([]);
      });

      after(() => {
        ProductsModel.getAll.restore();
      });

      it('retorna um array', async () => {
        const response = await ProductsService.getAll();

        expect(response).to.be.an('array');
      });

      it('o array está vazio', async () => {
        const response = await ProductsService.getAll();

        expect(response).to.be.empty;
      });
    });

    describe('quando possuem produtos no banco de dados', () => {

      const resultQuery = [
        {
          id: 1,
          name: 'Martelo de Thor',
        }
      ]

      before(() => {
        sinon.stub(ProductsModel, 'getAll')
          .resolves(resultQuery);
      });

      after(() => {
        ProductsModel.getAll.restore();
      });

      it('deve retornar um array', async () => {
        const result = await ProductsModel.getAll();
        expect(result).to.be.an('array');
      });

      it('o array não deve estar vazio', async () => {
        const result = await ProductsModel.getAll();
        expect(result).to.be.not.empty;
      });

      it('o array possui objetos', async () => {
        const [result] = await ProductsModel.getAll();
        expect(result).to.be.an('object');
      });

      it('o objeto que esta no array contem os atributos id e name', async () => {
        const [result] = await ProductsModel.getAll();
        expect(result).to.be.includes.all.keys(
          'id',
          'name'
        )
      });
    });
  });
});
