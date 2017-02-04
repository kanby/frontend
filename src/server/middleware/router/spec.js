import { expect } from 'chai';
import { describe, it } from 'mocha';
import routerMw from './index';
import * as routing from 'shared/routing';
import sinon from 'sinon';

describe.only('server/middleware/router', () => {
  let match, next;

  beforeEach(() => {
    match = sinon.stub(routing, 'match');
    next = sinon.spy();
  });

  afterEach(() => {
    match.restore();
    next.restore();
  })

  it('adds matched component to request state when url matches a route', () => {
    const ctx = { url: '/test' };
    match.returns('matched-route');
    routerMw(ctx, next);
    expect(match).to.have.been.calledWith(ctx.url);
    expect(ctx.state.matchedRoute).to.equal('matched-route');
    expect(next).to.have.been.calledOnce;
  });

  it('does not set any state if route not found', () => {

  })

  it('calls next middleware', () => {

  })
})
