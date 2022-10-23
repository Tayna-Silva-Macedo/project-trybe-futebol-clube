import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';

import { findAllMock, findByIdMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {
  describe('Verifica se todos os times são retornados corretamente', () => {
    let response: Response;

    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(findAllMock as Teams[]);

      response = await chai.request(app).get('/teams');
    });

    after(() => {
      sinon.restore();
    });

    it('retorna status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('retorna todos os times', () => {
      expect(response.body).to.be.deep.equal(findAllMock);
    });
  });
});
