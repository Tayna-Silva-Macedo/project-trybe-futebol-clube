import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';

import { findOneMock } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', () => {
  describe('Verifica se é possível fazer login com sucesso', async () => {
    let response: Response;

    before(async () => {
      sinon.stub(Users, 'findOne').resolves(findOneMock as Users);

      response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna um token', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('Verifica se não é possível fazer login sem o campo de email', () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        password: 'secret_admin',
      });
    });

    it('retorna status 400', () => {
      expect(response.status).to.be.equal(400);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });

  describe('Verifica se não é possível fazer login sem o campo de senha', () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
      });
    });

    it('retorna status 400', () => {
      expect(response.status).to.be.equal(400);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });

  describe('Verifica se não é possível fazer login para um usuário que não existe', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Users, 'findOne').resolves(null);

      response = await chai.request(app).post('/login').send({
        email: 'teste@teste.com',
        password: 'secret_admin',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(response.status).to.be.equal(401);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });

  describe('Verifica se não é possível fazer login quando a senha está incorreta', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Users, 'findOne').resolves(findOneMock as Users);

      response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret',
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(response.status).to.be.equal(401);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });
});

describe('Testes da rota /login/validate', () => {
  describe('Verifica se ao fazer login com sucesso é retornada a função do usuário', async () => {
    let loginResponse: Response;
    let validateResponse: Response;

    before(async () => {
      sinon.stub(Users, 'findOne').resolves(findOneMock as Users);

      loginResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      const token = loginResponse.body.token;

      validateResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token);
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(validateResponse.status).to.be.equal(200);
    });

    it('retorna a função do usuário', () => {
      expect(validateResponse.body).to.be.deep.equal({ role: 'admin' });
    });
  });

  describe('Verifica se é retornado um erro ao tentar acessar a rota sem token', async () => {
    let validateResponse: Response;

    before(async () => {
      validateResponse = await chai
        .request(app)
        .get('/login/validate')
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(validateResponse.status).to.be.equal(401);
    });

    it('retorna uma mensagem', () => {
      expect(validateResponse.body).to.be.deep.equal({ message: 'Token not found' });
    });
  });

  describe('Verifica se é retornado um erro ao tentar acessar a rota com um token inválido', async () => {
    let validateResponse: Response;

    before(async () => {
      validateResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '123invalid_token456');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(validateResponse.status).to.be.equal(401);
    });

    it('retorna uma mensagem', () => {
      expect(validateResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});
