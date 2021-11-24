import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export const Dashboard: React.FC = () => {
  const data = [
    {
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12.000,0',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2021',
    },
    {
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12.000,0',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2021',
    },
    {
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12.000,0',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2021',
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/167095',
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Hatus</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />

        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída em 03 de abril"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: getBottomSpace() }}
        />
      </Transactions>
    </Container>
  );
};
