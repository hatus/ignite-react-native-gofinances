import React from 'react';
import { FlatList } from 'react-native';

import { Button } from '../../components/Forms/Button';

import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string;
  setCategory: (category: Category) => void; // para atualizar o estado
  closeSelectCategory: () => void; // fechar o modal
}

export const CategorySelect: React.FC<Props> = ({
  category,
  closeSelectCategory,
  setCategory,
}) => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
        style={{ flex: 1, width: '100%' }}
      />

      <Footer>
        <Button title="Selecionar" />
      </Footer>
    </Container>
  );
};
