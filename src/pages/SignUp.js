import React, { useRef, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import getValidationErrors from '../utils/getValidationErrors';
import api from '../services/api';

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
  const formRef = useRef(null);

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  const handleSignUp = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha Obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);

        Alert.alert('Cadastro realizado', 'Você já pode realizar o login');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current.setErrors(errors);

          Alert.alert(
            'Erro no cadastro',
            'Verifique os campos em vermelho. A senha deve conter no mínimo 6 dígitos.'
          );

          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao cadastrar, tente novamente.'
        );
      }
    },
    [navigation]
  );

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

            <Form style={styles.form} ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passInputRef.current?.focus();
                }}
              />
              <Input
                ref={passInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
            </Form>
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
