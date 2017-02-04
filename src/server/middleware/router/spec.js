import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as routing from 'shared/routing';
import routes from 'shared/routing/routes';
import sinon from 'sinon';

import router from './index';
import * as handlers from './handlers';

describe('server/middleware/router', () => {
  describe('handlers:health-check', () => {
    it('sets response to 200', () => {
      const ctx = {};
      handlers.healthCheck(ctx);
      expect(ctx).to.deep.eq({ status: 200 });
    });
  });

  describe('handlers:match-application-routes', () => {
    let match, next;

    beforeEach(() => {
      match = sinon.stub(routing, 'match');
      next = sinon.stub();
    });

    afterEach(() => {
      match.restore();
    });

    it('calls next middleware in stack', () => {
      next.returns('next!')
      const ret = handlers.matchApplicationRoutes({}, next);
      expect(next).to.have.been.calledOnce;
      expect(ret).to.equal('next!');
    });

    it('adds matched component to request state when url matches a route', () => {
      const ctx = { url: '/test', state: {} };
      match.returns('matched-route');
      handlers.matchApplicationRoutes(ctx, next);
      expect(match).to.have.been.calledWith(routes, ctx.url);
      expect(ctx.state.matchedRoute).to.equal('matched-route');
    });

    it('does not set any state if route not found', () => {
      const ctx = { url: '/test', state: {} };
      match.returns(null);
      handlers.matchApplicationRoutes(ctx, next);
      expect(ctx).to.deep.eq({ url: '/test', state: {} });
    });
  })
})
