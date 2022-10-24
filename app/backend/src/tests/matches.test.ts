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
});
