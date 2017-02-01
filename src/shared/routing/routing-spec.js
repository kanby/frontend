import { route, match } from './index';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('routing/route', () => {
  it(
    'returns a route definition with a path, component, and Route instance',
    () => {
      const testRoute = route('/index', { some: 'component' });
      expect(testRoute.path).to.equal('/index');
      expect(testRoute.component).to.eql({ some: 'component' });
      expect(testRoute.Route).to.be.defined;
    },
  );
});

describe('routing/match', () => {
  it('takes a list of routes, and returns the first match for a path', () => {
    const routes = [route('/a', 'hello'), route('/b', 'world')];

    const matched = match(routes, '/a');

    expect(matched.route).to.equal(routes[0]);
    expect(matched.params).to.eql({});
    expect(matched.path).to.equal('/a');
  });

  it('returns the first match', () => {
    const routes = [route('/a', 'a'), route('/a', 'b')];

    const matched = match(routes, '/a');
    expect(matched.route).to.equal(routes[0]);
  });

  it('returns null when no match found', () => {
    const routes = [route('/a', 'hello')];

    const matched = match(routes, '/b');
    expect(matched).to.be.null;
  });
});
