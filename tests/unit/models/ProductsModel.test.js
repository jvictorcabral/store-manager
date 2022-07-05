const ProductsModel = require('../../../models/ProductsModel');
const connection = require('../../../models/connection');
const sinon = require('sinon');
const { expect } = require('chai');

describe('ProductsModel', () => {
  describe('getAll', () => {
    describe('quando não possui nenhum produto no banco de dados', () => {
      const resultQuery = [[]];

      before(() => {
        sinon.stub(connection, 'query')
          .resolves(resultQuery)
      })

      after(() => {
        connection.query.restore();
      })

      it('deve retornar um array', async () => {
        const result = await ProductsModel.getAll();
        expect(result).to.be.an('array');
      });

      it('o array deve estar vazio', async () => {
        const result = await ProductsModel.getAll();
        expect(result).to.be.empty;
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
        sinon.stub(connection, 'query')
          .resolves([resultQuery])
      })

      after(() => {
        connection.query.restore();
      })

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

  describe('addNewProduct', () => {
    const payloadProduct = {
      name: 'abacate albino'
    };

    before(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, "query").resolves(execute);
    });

    after(async () => {
      connection.query.restore();
    });

    describe("quando é inserido com sucesso", async () => {
      it("retorna um objeto", async () => {
        const response = await ProductsModel.addNewProduct(payloadProduct);

        expect(response).to.be.a("object");
      });

      it('tal objeto possui o "id" do novo filme inserido', async () => {
        const response = await ProductsModel.addNewProduct(payloadProduct);

        expect(response).to.have.a.property("id");
      });
    });
  })
});