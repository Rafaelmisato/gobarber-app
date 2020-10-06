import React, { useState, useRef, useCallback } from 'react';
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
  iconSelected: {
    marginRight: 16,
    color: '#ff9000',
  },
});

const Input = ({ name, icon, ...rest }) => {
  // const inputElementRef = useRef(null);
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <View
      style={isFocused ? styles.inputContainerSelected : styles.inputContainer}
    >
      <Icon
        style={isFilled ? styles.iconSelected : styles.icon}
        name={icon}
        size={20}
        color={isFocused ? '#ff9000' : '#666360'}
      />

      <TextInput
        // ref={inputElementRef}
        style={styles.input}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
    </View>
  );
};

export default Input;
