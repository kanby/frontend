import { expect } from 'chai';
import sinon from 'sinon';

import logger from './index';

describe('server/middleware/logger', () => {
  it('logs request method', () => {
    const method = 'GET';
    const stub = sinon.stub(console, 'log');
    logger({ method }, () => {});
    expect(stub).to.have.been.calledWithMatch(method);
    stub.restore();
  });

  it('logs request path', () => {
    const url = '/pathname';
    const stub = sinon.stub(console, 'log');
    logger({ url }, () => {});
    expect(stub).to.have.been.calledWithMatch(url);
    stub.restore();
  });

  it('threads to next middleware when done', () => {
    const ctx = { method: 'GET', url: '/pathname' };
    const log = sinon.stub(console, 'log');
    const stub = sinon.stub();
    logger(ctx, stub);
    expect(stub).to.have.been.calledOnce;
    expect(log).to.have.been.calledOnce;
    log.restore();
  });
});
