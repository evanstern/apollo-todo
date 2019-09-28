import React from 'react';

import { Link } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import { useAuth } from 'context/AuthContext';

const StyledHeader = styled.header`
  background: #1b1c1d;
  margin-bottom: 2rem;
`;

const StyledMenu = styled(Menu)`
  padding: 1.45rem 1.0875rem;
  max-width: 960px;
  margin: 0 auto !important;
  padding: 0 !important;

  .header {
    color: white !important;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
`;

const LogoutLink = styled(Header)`
  cursor: pointer;
`;

export const Navbar: React.FC = () => {
  const { isLoggedIn, setToken } = useAuth();

  const handleLogoutClick = (): void => {
    if (setToken) {
      setToken('');
    }
  };

  return (
    <StyledHeader>
      <StyledMenu borderless inverted>
        <Menu.Item>
          <Link to="/">
            <Header as="h1">Todo</Header>
          </Link>
        </Menu.Item>
        {isLoggedIn() && (
          <Menu.Menu position="right">
            <Menu.Item>
              <LogoutLink as="h3" onClick={handleLogoutClick}>
                Logout
              </LogoutLink>
            </Menu.Item>
          </Menu.Menu>
        )}
      </StyledMenu>
    </StyledHeader>
  );
};
