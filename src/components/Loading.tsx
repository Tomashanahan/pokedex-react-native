import React from 'react';
import {View, ActivityIndicator, ViewStyle, StyleProp} from 'react-native';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
}

function Loading({size, style}: Props) {
  return (
    <View>
      <ActivityIndicator size={size} style={style} />
    </View>
  );
}

export default Loading;
