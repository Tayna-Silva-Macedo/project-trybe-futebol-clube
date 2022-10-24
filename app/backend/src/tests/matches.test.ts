import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';

import {
  findAllMock,
  findAllInProgressMock,
  findAllFinishedMock,
  createdMatchMock,
} from './mocks/matches.mock';
import { findByIdMock } from './mocks/teams.mock';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matches', () => {
  describe('Verifica se retorna todas as partidas corretamente', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Matches, 'findAll').resolves(findAllMock as Matches[]);

      response = await chai.request(app).get('/matches');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna todas as partidas', () => {
      expect(response.body).to.be.deep.equal(findAllMock);
    });
  });

  describe('Verifica se é possível filtrar as partidas em andamento', () => {
    let response: Response;

    before(async () => {
      sinon
        .stub(Matches, 'findAll')
        .resolves(findAllInProgressMock as Matches[]);

      response = await chai.request(app).get('/matches?inProgress=true');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna todas as partidas em andamento', () => {
      expect(response.body).to.be.deep.equal(findAllInProgressMock);
    });
  });

  describe('Verifica se é possível filtrar as partidas finalizadas', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Matches, 'findAll').resolves(findAllFinishedMock as Matches[]);

      response = await chai.request(app).get('/matches?inProgress=false');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna todas as partidas finalizadas', () => {
      expect(response.body).to.be.deep.equal(findAllFinishedMock);
    });
  });

  describe('Verifica se é possível salvar uma partida com o status de inProgress como true', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Matches, 'create').resolves(createdMatchMock as Matches);

      response = await chai.request(app).post('/matches').send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 201', () => {
      expect(response.status).to.be.equal(201);
    });

    it('retorna a partida que foi salva', () => {
      expect(response.body).to.be.deep.equal(createdMatchMock);
    });
  });

  describe('Verifica se é possível alterar o status inProgress para false', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Matches, 'update').resolves();

      response = await chai.request(app).patch('/matches/1/finish');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });

  describe('Verifica se não é possível inserir uma partida com times iguais', () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).post('/matches').send({
        homeTeam: 16,
        awayTeam: 16,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 422', () => {
      expect(response.status).to.be.equal(422);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({
        message: 'It is not possible to create a match with two equal teams',
      });
    });
  });

  describe('Verifica se não é possível inserir uma partida para um time que não existe no banco de dados', () => {
    let response: Response;

    before(async () => {
      sinon
        .stub(Teams, 'findByPk')
        .onFirstCall()
        .resolves(findByIdMock as Teams)
        .onSecondCall()
        .resolves(null);

      response = await chai.request(app).post('/matches').send({
        homeTeam: 4,
        awayTeam: 99999,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 404', () => {
      expect(response.status).to.be.equal(404);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({
        message: 'There is no team with such id!',
      });
    });
  });

  describe('Verifica se só é possível inserir uma partida caso o token seja válido', () => {
    let response: Response;

    before(async () => {
      response = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set('authorization', '123invalid_token456');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 401', () => {
      expect(response.status).to.be.equal(401);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });
  });
});
