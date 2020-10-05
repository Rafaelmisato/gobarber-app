import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 24,
    color: '#f4ede8',
    fontFamily: 'RobotoSlab-Medium',
    marginTop: 64,
    marginBottom: 24,
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Image source={logoImg} />

      <Text style={styles.title}>Faça seu login</Text>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button OnPress={() => {}}>Entrar</Button>
    </View>
  );
};

export default SignIn;
