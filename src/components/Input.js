import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useField } from '@unform/core';

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
  inputContainerSelected: {
    alignSelf: 'stretch',
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#232129',
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ff9000',
    borderWidth: 2,
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
  iconError: {
    marginRight: 16,
    color: '#c53030',
  },
});

const Input = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef(null);
  const inputValueRef = useRef({});

  const { fieldName, defaultValue = '', error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <View
      style={isFocused ? styles.inputContainerSelected : styles.inputContainer}
    >
      <Icon
        style={error ? styles.iconError : styles.icon}
        name={icon}
        size={20}
        color={isFocused ? '#ff9000' : '#666360'}
      />

      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputValueRef}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </View>
  );
};

export default forwardRef(Input);
