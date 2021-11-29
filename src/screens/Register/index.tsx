import React from 'react';

import { Button } from '../../components/Button';
import { Input } from '../../components/Forms/Input';

import { Container, Header, Title, Form, Fields } from './styles';

export const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
