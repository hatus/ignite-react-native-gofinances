import React from 'react';

import { Container, Title, Amount } from './styles';

interface Props {
  title: string;
  color: string;
  amount: string;
}

export const HistoryCard: React.FC<Props> = ({ title, color, amount }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
