import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignTitle,
  Footer,
} from './styles';

import AppleSvg from '../../assets/images/apple.svg';
import GoogleSvg from '../../assets/images/google.svg';
import LogoSvg from '../../assets/images/logo.svg';

export const SignIn: React.FC = () => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples
          </Title>
        </TitleWrapper>

        <SignTitle>Faça seu login com{'\n'}uma das contas abaixo</SignTitle>
      </Header>
      <Footer></Footer>
    </Container>
  );
};
