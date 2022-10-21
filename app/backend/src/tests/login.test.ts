import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', () => {
  let chaiHttpResponse: Response;

  describe('Verifica se é possível fazer login com sucesso', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'teste@teste.com',
        password: 'senhasupersecreta',
      });
    });

    it('retorna status 200', async () => {
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('retorna um token', () => {
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });
});
