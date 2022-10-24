import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';

import { findAllMock, findAllInProgressMock } from './mocks/matches.mock';

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
      sinon.stub(Matches, 'findAll').resolves(findAllInProgressMock as Matches[]);

      response = await chai.request(app).get('/matches?inProgress=true');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna todas as partidas', () => {
      expect(response.body).to.be.deep.equal(findAllInProgressMock);
    });
  });
});
