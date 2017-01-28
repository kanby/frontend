import { expect } from 'chai';
import { describe, beforeEach, afterEach } from 'mocha';
import fs from 'mz/fs';
import sinon from 'sinon';
import getManifest from './index';

describe('util/get-manifest', () => {
  const data = '{ "test": "hello-world.js" }';
  let stub;

  beforeEach(() => { stub = sinon.stub(fs, 'readFile').returns(data); });
  afterEach(() => stub.restore());

  it('returns manifest.json as an object', async () => {
    const manifest = await getManifest();
    expect(stub).to.have.been.called;
    expect(manifest).to.eql(JSON.parse(data));
  });

  it('stores manifest in-memory', async () => {
    const manifest = await getManifest();
    try {
      await getManifest();
      expect(stub).not.to.have.been.calledTwice;
      expect(manifest).to.eql(JSON.parse(data));
    } catch (err) {
      throw err;
    }
  });
});
