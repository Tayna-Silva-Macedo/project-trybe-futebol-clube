import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import { findAllTeamsMock } from './mocks/teams.mock';
import { findAllMatchesFinishedMock } from './mocks/matches.mock';
import {
  leaderboardHomeResult,
  leaderboardAwayResult,
  leaderboardResult,
} from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /leaderboard', () => {
  describe('Verifica se retorna as classificações dos times da casa corretamente ao acessar /home', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(findAllTeamsMock as Teams[]);
      sinon
        .stub(Matches, 'findAll')
        .resolves(findAllMatchesFinishedMock as Matches[]);

      response = await chai.request(app).get('/leaderboard/home');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna as classificações corretamente', () => {
      expect(response.body).to.be.deep.equal(leaderboardHomeResult);
    });
  });

  describe('Verifica se retorna as classificações dos times visitantes corretamente ao acessar /away', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(findAllTeamsMock as Teams[]);
      sinon
        .stub(Matches, 'findAll')
        .resolves(findAllMatchesFinishedMock as Matches[]);

      response = await chai.request(app).get('/leaderboard/away');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna as classificações corretamente', () => {
      expect(response.body).to.be.deep.equal(leaderboardAwayResult);
    });
  });

  describe('Verifica se retorna as classificações gerais dos times corretamente ao acessar /', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(findAllTeamsMock as Teams[]);
      sinon
        .stub(Matches, 'findAll')
        .resolves(findAllMatchesFinishedMock as Matches[]);

      response = await chai.request(app).get('/leaderboard');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna as classificações corretamente', () => {
      expect(response.body).to.be.deep.equal(leaderboardResult);
    });
  });
});
