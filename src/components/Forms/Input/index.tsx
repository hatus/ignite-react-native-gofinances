import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

// apenas para ficar um nome menor
type Props = TextInputProps;

export const Input: React.FC<Props> = ({ ...rest }) => {
  return <Container {...rest} />;
};
