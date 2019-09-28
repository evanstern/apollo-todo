import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';

import { AuthProvider } from 'context/AuthContext';
import { client } from 'lib/apolloClient';

import { Routes } from './Routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Routes />
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
