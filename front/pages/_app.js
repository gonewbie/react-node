import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../components/AppLayout';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';

const ReactNode = ({ Component, store }) => {
  return (
    <>
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.js" />
      </Head>
      <AppLayout>
          <Component />
      </AppLayout>
    </Provider>
    </>
  );
};

ReactNode.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object
}

export default withRedux((initialState,options) => {
  const middlewares = [];
  const enhancer = compose(applyMiddleware(...middlewares), 
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  );
  const store = createStore(reducer, initialState, enhancer);
  return store;
})(ReactNode);