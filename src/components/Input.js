import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'stretch',
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#232129',
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Regular',
  },
  icon: {
    marginRight: 16,
  },
});

const Input = ({ name, icon, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon style={styles.icon} name={icon} size={20} color="#666360" />

      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </View>
  );
};

export default Input;
