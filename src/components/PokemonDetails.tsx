/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {PokemonDetail} from '../interfaces/Pokemon.interface';
import {useContext} from 'react';
import {ThemeContext} from '../context/Theme/Theme.context';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemonDetail: PokemonDetail;
}

function PokemonDetails({pokemonDetail}: Props) {
  const {theme} = useContext(ThemeContext);

  return (
    <ScrollView style={{...StyleSheet.absoluteFillObject}} showsVerticalScrollIndicator={false}>
      {/* Types and weight*/}
      <View style={style.typesContainer}>
        {/* Types */}
        <Text style={{color: theme.colors.text, ...style.titleText}}>Types</Text>
        <View style={style.textContainer}>
          {pokemonDetail.types.map(({type}) => (
            <Text style={{...style.text, color: theme.colors.text}} key={type.name}>
              {type.name}{' '}
            </Text>
          ))}
        </View>

        {/* Weight */}
        <Text style={{color: theme.colors.text, ...style.titleText}}>Weight</Text>
        <Text style={{color: theme.colors.text, ...style.text}}>{pokemonDetail.weight}kg</Text>
      </View>

      {/* Sprites */}
      <View style={style.container}>
        <Text style={{color: theme.colors.text, ...style.titleText}}>Sprites</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FadeInImage uri={pokemonDetail.sprites.back_default} style={style.spritesImg} />
          <FadeInImage uri={pokemonDetail.sprites.back_shiny} style={style.spritesImg} />
          <FadeInImage uri={pokemonDetail.sprites.front_default} style={style.spritesImg} />
          <FadeInImage uri={pokemonDetail.sprites.front_shiny} style={style.spritesImg} />
        </ScrollView>
      </View>

      {/* abilities */}
      <View style={style.container}>
        <Text style={{color: theme.colors.text, ...style.titleText}}>Abilities</Text>
        <View style={style.textContainer}>
          {pokemonDetail.abilities.map(({ability}) => (
            <Text style={{...style.text, color: theme.colors.text}} key={ability.name}>
              {ability.name}{' '}
            </Text>
          ))}
        </View>
      </View>

      {/* movements */}
      <View style={style.container}>
        <Text style={{color: theme.colors.text, ...style.titleText}}>Movements</Text>
        <View style={{...style.textContainer, flexWrap: 'wrap'}}>
          {pokemonDetail.moves.map(({move}) => (
            <Text style={{...style.text, color: theme.colors.text}} key={move.name}>
              {move.name}
              {', '}
            </Text>
          ))}
        </View>
      </View>

      {/* stats */}
      <View style={style.container}>
        <Text style={{color: theme.colors.text, ...style.titleText}}>Stats</Text>
        <View>
          {pokemonDetail.stats.map(({base_stat, stat}) => (
            <View key={stat.name} style={style.textContainer}>
              <Text
                style={{...style.text, color: theme.colors.text, width: 150, textTransform: 'capitalize'}}
                key={stat.name}>
                {stat.name}
              </Text>
              <Text style={{...style.text, color: theme.colors.text, fontWeight: 'bold'}} key={base_stat}>
                {base_stat}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{...style.container, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
        <FadeInImage uri={pokemonDetail.sprites.back_default} style={style.spritesImg} />
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {marginHorizontal: 20, marginTop: 20},
  scrollView: {},
  spritesImg: {width: 90, height: 90},
  spritesTextContainer: {flexDirection: 'row'},
  text: {fontSize: 15, textTransform: 'capitalize'},
  textContainer: {flexDirection: 'row'},
  titleText: {fontWeight: 'bold', fontSize: 20, marginTop: 10},
  typesContainer: {marginHorizontal: 20, marginTop: 385},
  typeText: {fontWeight: 'bold', fontSize: 20, textTransform: 'capitalize'},
});

export default PokemonDetails;
