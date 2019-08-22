import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';

const ReactNode = ({ Component }) => {
  return (
    <>
    <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.js" />
      </Head>
      <AppLayout>
          <Component />
      </AppLayout>
    </>
  );
};

ReactNode.propTypes = {
    Component: PropTypes.elementType,
}

export default ReactNode;