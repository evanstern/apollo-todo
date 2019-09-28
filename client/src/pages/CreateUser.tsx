import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Divider,
  Form,
  FormProps,
  Header,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { Layout } from 'components/Layout';

const Content = styled(Segment)`
  max-width: 350px;
  margin: 0 auto !important;
`;

const addUserQuery = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(user: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

export const CreateUser: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [addUser, { data: userData }] = useMutation(addUserQuery);

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    _data: FormProps
  ): void => {
    event.preventDefault();
    addUser({ variables: { email, password } });
  };

  if (userData) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <Layout>
      <Content>
        <Header as="h1" textAlign="center">
          Create a user
        </Header>
        <Divider />
        <Form onSubmit={handleFormSubmit}>
          <Form.Field
            label="email"
            name="email"
            control="input"
            type="email"
            onChange={(e: React.FormEvent<HTMLInputElement>): void =>
              setEmail(e.currentTarget.value)
            }
          />
          <Form.Field
            label="password"
            name="password"
            control="input"
            type="password"
            onChange={(e: React.FormEvent<HTMLInputElement>): void =>
              setPassword(e.currentTarget.value)
            }
          />
          <Button primary type="submit">
            Create User
          </Button>
        </Form>
      </Content>
    </Layout>
  );
};
