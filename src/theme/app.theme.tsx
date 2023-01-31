import {StyleSheet} from 'react-native';

export const appTheme = StyleSheet.create({
  globalMargin: {marginHorizontal: 20},
  pokebolaBG: {
    height: 300,
    width: 300,
    position: 'absolute',
    top: -100,
    right: -100,
    opacity: 0.2,
    zIndex: -1000,
  },
  title: {fontSize: 25, fontWeight: 'bold', color: '#000'},
});
