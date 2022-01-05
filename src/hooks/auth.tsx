import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
  children: ReactNode;
}

// interface com props do User
interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

// interface para definir o tipo de dado do contexto
interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

// criando o contexto com objeto (vazio) do tipo IAuthContextData
const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID =
        '328085838438-qe0nb7ohop6mf7qpfekuva11oas9nd7v.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@hatusn/gofinances';
      const RESPONSE_TYPE = 'token';
      // encodeURI serve para transformar o espaço em branco em um formato de URI
      const SCOPE = encodeURI('profile email');

      // endpoint de autenticação da google
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    // exportando no context user e signInWithGoogle
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
