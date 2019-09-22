import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';
import { Container } from 'next/app';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

const ReactNode = ({ Component, store, pageProps }) => (
  <Container>
    <Provider store={store}>
      <Helmet
        title="NodeBird"
        htmlAttributes={{ lang: 'ko' }}
        meta={[{
          charset: 'UTF-8',
        }, {
          name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        }, {
          'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
        }, {
          name: 'description', content: '리액트를 활용한 NodeBird SNS',
        }, {
          property: 'og:title', content: 'NodeBird',
        }, {
          property: 'og:description', content: '리액트를 활용한 NodeBird SNS',
        }, {
          property: 'og:type', content: 'website',
        }]}
        link={[{
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
        }]}
        script={[{
          src: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.js',
        }]}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  </Container>
);

ReactNode.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  // 유저 정보 로딩 : 순서대로 실행되므로 유저 정보부터
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : null;
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  // 페이지 정보 로딩
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};

ReactNode.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(ReactNode));
