import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';

import { findAllTeamsMock, findTeamByIdMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {
  describe('Verifica se todos os times são retornados corretamente', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(findAllTeamsMock as Teams[]);

      response = await chai.request(app).get('/teams');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna todos os times', () => {
      expect(response.body).to.be.deep.equal(findAllTeamsMock);
    });
  });

  describe('Verifica se um time é retornado corretamente pelo seu id', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Teams, 'findByPk').resolves(findTeamByIdMock as Teams);

      response = await chai.request(app).get('/teams/4');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna o time de id 4', () => {
      expect(response.body).to.be.deep.equal(findTeamByIdMock);
    });
  });

  describe('Verifica se é retornado um erro ao buscar por um id que não existe', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Teams, 'findByPk').resolves(null);

      response = await chai.request(app).get('/teams/100');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 404', () => {
      expect(response.status).to.be.equal(404);
    });

    it('retorna o time de id 4', () => {
      expect(response.body).to.be.deep.equal({ message: 'Team not found' });
    });
  });
});
