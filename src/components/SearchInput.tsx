/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';

import {StyleSheet, TextInput, View, ViewStyle, StyleProp} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import useDebounce from '../hooks/useDebounce';

interface Props {
  styles?: StyleProp<ViewStyle>;
  onDebounce: (value: any) => void;
}

function SearchInput({styles, onDebounce}: Props) {
  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebounce(textValue);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{...style.containerIOS, ...(styles as any)}}>
      <View style={style.inputTextContainer}>
        <TextInput
          placeholder="Search Pokemon"
          placeholderTextColor={'gray'}
          style={style.textInput}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" size={20} color="gray" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  containerIOS: {},
  textInput: {
    flex: 1,
    fontSize: 18,
    width: '100%',
    justifyContent: 'center',
    padding: 0,
  },
  inputTextContainer: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default SearchInput;
