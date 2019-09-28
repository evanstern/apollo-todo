import React from 'react';

import styled from 'styled-components';

import { Navbar } from 'components/Navbar';

const Content = styled.main`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  padding-top: 0;
`;

const Footer = styled.footer`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  padding-top: 0;
`;

interface IProps {
  children: React.ReactNode;
}

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Content>{children}</Content>
      <Footer>
        <div>© {new Date().getFullYear()}, MachineServant LLC</div>
      </Footer>
    </>
  );
};
