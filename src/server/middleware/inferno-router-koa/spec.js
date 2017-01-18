import { expect } from 'chai';
import Inferno from 'inferno';
import infernoRouter, { match, Route, IndexRoute, RouterContext } from 'inferno-router';
import { renderToString } from 'inferno-server';
import sinon from 'sinon';
import { createMockComponent } from 'test/utils';

import { initRouting, getRenderProps, handleRedirects, renderBody } from './index';

const App = createMockComponent('App');
const Page1 = createMockComponent('Page1');
const Page2 = createMockComponent('Page2');

const routes = (
  <Route component={App}>
    <IndexRoute component={Page1} />
    <Route path="test/path" component={Page2} />
  </Route>
);

const baseContext = { state: {} };

describe('server:middleware/inferno-router-koa', () => {
  describe('initRouting', () => {
    it('takes an inferno-router routes object and returns a middleware', () => {
      const middleware = initRouting(routes);
      const next = sinon.spy();
      expect(middleware).to.be.a.function;
      middleware({ ...baseContext }, next);
      expect(next).to.have.been.called;
    });

    it('initialises routing state', () => {
      const middleware = initRouting(routes);
      const next = sinon.spy();
      const ctx = { ...baseContext };
      middleware(ctx, next);
      expect(ctx.state.infernoRouter).to.be.defined;
      expect(ctx.state.infernoRouter.routes).to.equal(routes);
    });
  });

  describe('getRenderProps', () => {
    const spy = sinon.spy(infernoRouter, 'match');
    const url = '/test/path';
    const ctx = { ...baseContext, url, state: { infernoRouter: { routes } } };
    const next = sinon.spy();
    getRenderProps(ctx, next);

    after(() => {
      spy.restore();
    });

    it('matches render props using inferno router\'s match, passing url and routes from context', () => {
      expect(spy).to.have.been.calledWith(routes, url);
    });

    it('saves renderProps in routing state', () => {
      expect(ctx.state.infernoRouter.renderProps).to.be.defined;
    });

    it('calls next middleware in the chain', () => {
      expect(next).to.have.been.called;
    });
  });

  describe('handleRedirects', () => {
    it('redirects when a redirect url is found in renderProps', () => {
      const ctx = {
        ...baseContext,
        state: {
          infernoRouter: {
            renderProps: {
              redirect: '/test',
            },
          },
        },
        redirect: sinon.spy(),
      };

      const next = sinon.spy();

      handleRedirects(ctx, next);

      expect(ctx.redirect).to.have.been.calledWith('/test');
      expect(next).not.to.have.been.called;
    });
  });

  describe('renderBody', () => {
    it('renders a RouterContext with resolved renderProps', () => {
      const renderProps = match(routes, '/test/path');
      const ctx = {
        ...baseContext,
        state: {
          infernoRouter: {
            renderProps,
          },
        },
      };

      const next = sinon.spy();

      renderBody(ctx, next);

      expect(ctx.state.infernoRouter.body).to.be.defined;

      expect(renderToString(ctx.state.infernoRouter.body)).to.deep.equal(renderToString(
        <App>
          <Page2 />
        </App>,
      ));

      expect(next).to.have.been.called;
    });
  });
});
