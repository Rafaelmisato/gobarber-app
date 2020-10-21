import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

const Input = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef(null);
  const inputValueRef = useRef({});

  const { fieldName, defaultValue = '', error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    // <Container
    //   style={isFocused ? styles.inputContainerSelected : styles.inputContainer}
    // >
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} size={20} color={isFilled ? '#ff9000' : '#666360'} />

      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
