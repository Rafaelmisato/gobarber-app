import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    height: 60,
    backgroundColor: '#ff9000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: 'RobotoSlab-Medium',
    color: '#312e38',
    fontSize: 18,
  },
});

const Button = ({ children, ...rest }) => {
  return (
    <RectButton style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{children}</Text>
    </RectButton>
  );
};

export default Button;
