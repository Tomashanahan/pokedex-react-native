import React from 'react';

import {ActivityIndicator, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackScreenProps} from '@react-navigation/stack';

import {FadeInImage} from '../components/FadeInImage';
import {StackParams} from '../navigation/StackNavigator.navigation';
import {ThemeContext} from '../context/Theme/Theme.context';
import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import usePokemon from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<StackParams, 'Pokemon'> {}

const {width: windowWidth} = Dimensions.get('window');

function Pokemon({
  route: {
    params: {simplePokemon, color},
  },
}: Props) {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const navigator = useNavigation();
  const {pokemonDetail, isLoading} = usePokemon(simplePokemon.id);

  const pokebolaPlatformStyle = Platform.OS === 'android' ? 'androidPokebola' : 'iosPokebola';

  return (
    <View style={{backgroundColor: colors.background, ...style.container}}>
      <View style={{...style.headerContainer, backgroundColor: color, paddingTop: top}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...style.touchableOpacity, top}}
          onPress={() => navigator.goBack()}>
          <Icon name="arrow-back-circle-outline" size={45} color="#FFFF" />
        </TouchableOpacity>

        <Text style={{...style.text}}>
          {simplePokemon.name}
          {'\n#' + simplePokemon.id}
        </Text>

        <Image style={style[pokebolaPlatformStyle]} source={require('../assets/pokebola-blanca.png')} />
        <FadeInImage uri={simplePokemon.picture} style={style.pokemonImage} />
      </View>
      {isLoading ? (
        <ActivityIndicator style={style.activityIndicator} size={40} color={color} />
      ) : (
        <PokemonDetails pokemonDetail={pokemonDetail} />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  activityIndicator: {position: 'absolute', top: '60%', left: windowWidth / 2 - 20, zIndex: 100000},
  touchableOpacity: {position: 'absolute', left: 10, zIndex: 300},
  headerContainer: {
    alignItems: 'center',
    borderBottomLeftRadius: 900,
    borderBottomRightRadius: 900,
    height: 350,
    zIndex: 200,
  },
  container: {flex: 1},
  text: {
    alignSelf: 'flex-start',
    color: '#FFFF',
    fontSize: 20,
    fontWeight: 'bold',
    left: 10,
    textTransform: 'capitalize',
    top: 60,
  },
  iosPokebola: {height: 250, width: 250, zIndex: -10, opacity: 0.6},
  androidPokebola: {height: 250, width: 250, zIndex: -10, opacity: 0.6, bottom: -30},
  pokemonImage: {height: 250, width: 250, bottom: -20, position: 'absolute'},
});

export default Pokemon;
