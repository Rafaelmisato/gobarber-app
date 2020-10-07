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
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import getValidationErrors from '../utils/getValidationErrors';
import { useAuth } from '../hooks/auth';

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

  const { signIn } = useAuth();

  const formRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSignIn = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha Inválida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        Alert.alert('Login efetuado', 'Seu login foi feito com sucesso!');

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais'
        );
      }
    },
    [signIn]
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
              <Text style={styles.title}>Faça seu login</Text>
            </View>

            <Form style={styles.form} ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
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
                Entrar
              </Button>
            </Form>

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
