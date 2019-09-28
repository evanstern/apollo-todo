import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

import decode from 'jwt-decode';
import moment from 'moment';

export interface IAuthProps {
  userId: string;
  email: string;
  token: string;
  setToken: Dispatch<SetStateAction<string>> | null;
  isLoggedIn: () => boolean;
}

interface IToken {
  email: string;
  userId: string;
  exp: number;
}

const AuthContext = createContext<IAuthProps | null>(null);

export const AuthProvider: React.FC = ({ children, ...props }) => {
  const prevToken = window.localStorage.getItem('auth') || '';
  const [token, setToken] = useState<string>(prevToken);
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const isLoggedIn = useCallback((): boolean => {
    if (!token) {
      return false;
    }

    const decodedToken = decode<IToken>(token);
    return moment().isBefore(moment(decodedToken.exp * 1000));
  }, [token]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('auth', token);
      const decodedToken = decode<IToken>(token);
      setUserId(decodedToken.userId);
      setEmail(decodedToken.email);
    } else {
      window.localStorage.removeItem('auth');
      setUserId('');
      setEmail('');
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, userId, email, isLoggedIn }}
      {...props}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider context');
  }
  return context;
};
