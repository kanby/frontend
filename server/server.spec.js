import { expect } from 'chai';
import server from './server';

describe('application server', () => {
  it('works', () => {
    expect(server).to.be.defined; // eslint-disable-line no-unused-expressions
  });
});
