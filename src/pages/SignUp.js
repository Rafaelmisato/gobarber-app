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
  BackToSignIn: {
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
  BackToSignInText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'RobotoSlab-Regular',
    marginLeft: 16,
  },
});

const SignUp = () => {
  const navigation = useNavigation();

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
              <Text style={styles.title}>Crie sua conta</Text>
            </View>

            <Form style={styles.form}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />
            </Form>

            <Button OnPress={() => {}}>Cadastrar</Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.BackToSignIn}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <Text style={styles.BackToSignInText}>Voltar para login</Text>
      </TouchableOpacity>
    </>
  );
};
export default SignUp;
