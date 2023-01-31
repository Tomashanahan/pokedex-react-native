/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';

import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

// import {ThemeContext} from '../context/Theme/Theme.context';
import {FadeInImage} from './FadeInImage';
import {getColors} from '../helpers/getImageColors';
import {SimplePokemon} from '../interfaces/Pokemon.interface';
import {useNavigation} from '@react-navigation/native';

interface Props {
  pokemon: SimplePokemon;
}

function PokemonCard({pokemon}: Props) {
  // const {theme} = useContext(ThemeContext);
  const [bgColors, setBgColors] = useState('gray');
  const isMounted = useRef(true);
  const navigator = useNavigation();

  const getImageColors = async (): Promise<void> => {
    try {
      const [secondary] = await getColors(pokemon.picture);
      setBgColors(secondary!);
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    getImageColors();

    return () => {
      isMounted.current = false;
    };
  }, [pokemon]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style.touchableOpacity}
      onPress={() => navigator.navigate('Pokemon' as never, {simplePokemon: pokemon, color: bgColors} as never)}>
      <FadeInImage style={style.img} uri={pokemon.picture} />
      <View style={style.textContainer}>
        <Text style={{...style.text}}>
          {pokemon.name}
          {'\n#' + pokemon.id}
        </Text>
      </View>
      <View style={{...style.container, backgroundColor: bgColors}}>
        <Image style={style.pokebola} source={require('../assets/pokebola.png')} />
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: 170,
    height: 135,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
  },
  img: {height: 120, width: 120, position: 'absolute', right: -8, zIndex: 1, bottom: -5},
  pokebola: {height: 100, width: 100, position: 'absolute', left: -25, bottom: -25, zIndex: -10, opacity: 0.5},
  textContainer: {
    position: 'absolute',
    zIndex: 500000,
    borderRadius: 10,
    top: '45%',
    transform: [{translateY: -50}],
  },
  text: {
    color: '#FFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    padding: 5,
    textTransform: 'capitalize',
  },
  touchableOpacity: {
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

export default PokemonCard;
