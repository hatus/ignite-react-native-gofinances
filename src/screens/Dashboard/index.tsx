import React from 'react';
import { Text, View } from 'react-native';

import { Container, Header } from './styles';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <Text>Imagem</Text>
        <View>
          <Text>Olá, </Text>
          <Text>Hatus</Text>
        </View>
      </Header>
    </Container>
  );
};
