import React, { createContext, ReactNode, useContext } from 'react';

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
}

// criando o contexto com objeto (vazio) do tipo IAuthContextData
const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user: User = {
    id: '123',
    name: 'hatus niwman',
    email: 'hatusn@gmail.com',
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
