import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';
import Input from '../components/Input';

import logoImg from '../assets/logo.png';

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
  form: {
    alignSelf: 'stretch',
  },
  forgotPassword: {
    marginTop: 24,
  },
  forgotPasswordText: {
    color: '#f4ede8',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Regular',
  },
  createButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#312e38',
    borderTopWidth: 1,
    borderColor: '#232129',
    paddingBottom: getBottomSpace(),
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  createButtonText: {
    color: '#ff9000',
    fontSize: 18,
    fontFamily: 'RobotoSlab-Regular',
    marginLeft: 16,
  },
});

const SignIn = () => {
  const navigation = useNavigation();
  function handleSignIn() {}
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTap="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.container}>
            <Image source={logoImg} />

            <View>
              <Text style={styles.title}>Faça seu login</Text>
            </View>

            <Form style={styles.form} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />
            </Form>

            <Button OnPress={() => {}}>Entrar</Button>

            <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
              <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <Text style={styles.createButtonText}>Criar uma conta</Text>
      </TouchableOpacity>
    </>
  );
};

export default SignIn;
