import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-radius: 5px;
  border: 1.5px solid ${({ theme }) => theme.colors.text};

  ${({ type, isActive }) =>
    type === 'up' &&
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border: 0;
    `}

  ${({ type, isActive }) =>
    type === 'down' &&
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border: 0;
    `}
`;
export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
