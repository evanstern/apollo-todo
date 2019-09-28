import React, { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  Button,
  Divider,
  Form,
  FormProps,
  Header,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { useAuth } from 'context/AuthContext';
import { Layout } from 'components/Layout';

const Content = styled(Segment)`
  max-width: 350px;
  margin: 0 auto !important;
`;

const loginQuery = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [doLogin, { data: loginData }] = useLazyQuery(loginQuery);

  const { setToken } = useAuth();

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    _data: FormProps
  ): void => {
    event.preventDefault();
    doLogin({ variables: { email, password } });
  };

  useEffect(() => {
    if (loginData && setToken) {
      setToken(loginData.login.token);
    }
  }, [loginData, setToken]);

  return (
    <Layout>
      <Content>
        <Header as="h1" textAlign="center">
          Login
        </Header>
        <Divider />
        <Form onSubmit={handleFormSubmit}>
          <Form.Field
            label="email"
            name="email"
            type="email"
            control="input"
            onChange={(e: React.FormEvent<HTMLInputElement>): void =>
              setEmail(e.currentTarget.value)
            }
          />
          <Form.Field
            label="password"
            name="password"
            type="password"
            control="input"
            onChange={(e: React.FormEvent<HTMLInputElement>): void =>
              setPassword(e.currentTarget.value)
            }
          />
          <Button primary type="submit">
            Login
          </Button>
        </Form>
      </Content>
    </Layout>
  );
};
