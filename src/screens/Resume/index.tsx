import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import { HistoryCard } from '../../components/HistoryCard';
import { dataKey } from '../Register';

import { Container, Header, Title, Content, ChartContainer } from './styles';
import { DataListProps } from '../Dashboard';
import { categories } from '../../utils/categories';

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percent: string;
}

export const Resume: React.FC = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  const theme = useTheme();

  const loadData = async () => {
    const response = await AsyncStorage.getItem(dataKey);
    const transactions: DataListProps[] = response ? JSON.parse(response) : [];

    // obtem apenas transações de saída (negative)
    const expensives = transactions.filter(
      expensive => expensive.type === 'negative',
    );

    // obtem o total dos valores de transações negativas
    const expensiveTotal = expensives.reduce(
      (acumullator, expensive) => acumullator + Number(expensive.amount),
      0,
    );

    const totalByCategory: CategoryData[] = [];

    // obtem o total por categoria e armazena no array totalByCategory: CategoryData[]
    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach(expensive => {
        if (category.key === expensive.category) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        });

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
          />
        </ChartContainer>

        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
};
