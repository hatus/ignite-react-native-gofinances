import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
}

export const Welcome: React.FC<Props> = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
