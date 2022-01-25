import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

import { HistoryCard } from '../../components/HistoryCard';
import { DataListProps } from '../Dashboard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from './styles';

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const { user } = useAuth();

  const handleChangeDate = (action: 'next' | 'prev') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions: DataListProps[] = response ? JSON.parse(response) : [];

    // obtem apenas transações de saída (negative)
    // e comparando com o MES E ANO da data selecionada
    const expensives = transactions.filter(
      expensive =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
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
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate]),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleChangeDate('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleChangeDate('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadContainer>
        ) : (
          <>
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
          </>
        )}
      </Content>
    </Container>
  );
};
