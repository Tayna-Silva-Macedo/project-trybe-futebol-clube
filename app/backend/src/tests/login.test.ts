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
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
    });

    it('retorna status 200', () => {
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('retorna um token', () => {
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('Verifica se não é possível fazer login com o campo de email vazio', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_admin',
      });
    });

    it('retorna status 400', () => {
      expect(chaiHttpResponse.status).to.be.equal(400);
    });

    it('retorna uma mensagem', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });

  describe('Verifica se não é possível fazer login com o campo de senha vazio', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: '',
      });
    });

    it('retorna status 400', () => {
      expect(chaiHttpResponse.status).to.be.equal(400);
    });

    it('retorna uma mensagem', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });

  describe('Verifica se não é possível fazer login para um usuário que não existe', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'teste@teste.com',
        password: 'secret_admin',
      });
    });

    it('retorna status 401', () => {
      expect(chaiHttpResponse.status).to.be.equal(401);
    });

    it('retorna uma mensagem', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });
});
