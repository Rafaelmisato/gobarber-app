import React from 'react';

import { RectButton } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';

const Button = ({ children, ...rest }) => {
  return (
    <RectButton>
      <Container {...rest}>
        <ButtonText>{children}</ButtonText>
      </Container>
    </RectButton>
  );
};

export default Button;
