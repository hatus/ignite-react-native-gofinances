import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignTitle,
  Footer,
  FooterWrapper,
} from './styles';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import AppleSvg from '../../assets/images/apple.svg';
import GoogleSvg from '../../assets/images/google.svg';
import LogoSvg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/auth';

export const SignIn: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta google.');
    }
  };

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

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
