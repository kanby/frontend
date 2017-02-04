import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as reactRouter from 'react-router';
import routes from 'shared/routes';
import sinon from 'sinon';
import * as createStoreModule from 'shared/create-store';

import * as handlers from './handlers';

const stubMatch = handler => sinon.stub(reactRouter, 'match', handler);

describe('server/middleware/router', () => {
  describe('handlers:health-check', () => {
    it('sets response to 200', () => {
      const ctx = {};
      handlers.healthCheck(ctx);
      expect(ctx).to.deep.eq({ status: 200 });
    });
  });

  describe('handlers:match-application-routes', () => {
    let createStore, match, next;

    beforeEach(() => {
      createStore = sinon
        .stub(createStoreModule, 'default')
        .returns({ history: 'history', store: 'store' });
      next = sinon.stub();
    });

    afterEach(() => {
      if (reactRouter.match.restore) reactRouter.match.restore();
      createStore.restore();
    });

    it('calls next middleware in stack', done => {
      stubMatch((o, cbk) => {
        cbk(null, null, null);
        expect(next).to.have.been.calledOnce;
        done();
      });

      handlers.matchApplicationRoutes({ url: '/test' }, next);
    });

    it('calls match with history, location and routes', done => {
      const ctx = { url: '/test', state: {} };
      const renderProps = { matched: true };

      stubMatch((o, cbk) => {
        cbk(null, null, renderProps);
        const [opts] = reactRouter.match.firstCall.args;
        expect(opts.location).to.equal(ctx.url);
        expect(opts.history).to.be.defined;
        expect(opts.routes).to.equal(routes);
        done();
      });

      handlers.matchApplicationRoutes(ctx, next);
    });

    it('adds renderProps to request state when a route is matched', done => {
      const ctx = { url: '/test', state: {} };
      const renderProps = { matched: true };

      stubMatch((o, cbk) => {
        cbk(null, null, renderProps);
        expect(ctx.state.renderProps).to.equal(renderProps);
        done();
      });

      handlers.matchApplicationRoutes(ctx, next);
    });

    it('adds a store to request state when a route is matched', done => {
      const ctx = { url: '/test', state: {} };
      const renderProps = { matched: true };

      stubMatch((o, cbk) => {
        cbk(null, null, renderProps);
        expect(createStore).to.have.been.calledOnce;
        expect(ctx.state.store).to.equal('store');
        done();
      });

      handlers.matchApplicationRoutes(ctx, next);
    });

    it('does not set any state if route not found', done => {
      const ctx = { url: '/test', state: {} };

      stubMatch((o, cbk) => {
        cbk(null, null, null);
        expect(ctx.state).to.deep.equal({});
        done();
      });

      handlers.matchApplicationRoutes(ctx, next);
    });

    it('calls ctx.throw with a 500 error if an error is returned', done => {
      const ctx = { url: '/test', throw: sinon.stub() };

      stubMatch((o, cbk) => {
        cbk({ message: 'test error' }, null, null);
        expect(ctx.throw).to.have.been.calledWith(500, 'test error');
        done();
      });

      handlers.matchApplicationRoutes(ctx, next);
    });

    it('sets ctx.url and ctx.status if a redirect is returned', done => {
      const ctx = { url: '/test' };

      stubMatch((o, cbk) => {
        cbk(null, { pathname: '/redirect', search: '?test=12' }, null);
        expect(ctx.url).to.equal('/redirect?test=12');
        expect(ctx.status).to.equal(307);
        done();
      });

      handlers.matchApplicationRoutes(ctx, next);
    });
  });
});
