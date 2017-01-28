import { expect } from 'chai';
import { contains, isString, validator } from './index';

describe('validators/is-string', () => {
  it('returns true if a string is passed', () => {
    expect(isString('test')).to.be.true;
  });

  it('returns false if not a string', () => {
    [12, false, new Date(), new Set(), new Map(), null, undefined].forEach((val) => {
      expect(isString(val)).to.be.false;
    });
  });
});

describe('validators/contains', () => {
  it('returns true if value in array', () => {
    expect(contains([1, 2], 2)).to.be.true;
  });

  it('returns false if value not in array', () => {
    expect(contains([1, 2], 3)).to.be.false;
  });
});

describe('validators/validator', () => {
  const validate = validator('not valid');

  it('is curry-able', () => {
    const curried = validator('not valid', false);
    expect(curried).to.equal('not valid');
  });

  it('outputs the supplied message when invalid', () => {
    expect(validate(false)).to.equal('not valid');
  });

  it('outputs true when valid', () => {
    expect(validate(true)).to.be.true;
  });
});
