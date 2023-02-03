/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect, useState} from 'react';

import {StyleSheet, View, FlatList, Platform, Text, Dimensions} from 'react-native';

import {ThemeContext} from '../context/Theme/Theme.context';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import {appTheme} from '../theme/app.theme';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import {SimplePokemon} from '../interfaces/Pokemon.interface';

const {width} = Dimensions.get('window');

function Search() {
  const {
    theme: {
      colors: {background, text},
    },
  } = useContext(ThemeContext);
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [searchedPokemons, setSearchedPokemons] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setSearchedPokemons([]);
    }
    if (isNaN(Number(term))) {
      setSearchedPokemons(
        simplePokemonList.filter(pokemon => {
          return pokemon.name.toLocaleLowerCase().includes(term.toLocaleLowerCase());
        }),
      );
    } else {
      setSearchedPokemons(
        simplePokemonList.filter(pokemon => {
          return pokemon.id.toString() === term;
        }),
      );
    }
  }, [simplePokemonList, term]);

  const iosStyles = {
    gap: 10,
    position: 'absolute',
    width: width,
    top: 50,
    zIndex: 100,
    padding: 5,
    paddingHorizontal: 25,
  };

  const androidStyles = {
    gap: 10,
    position: 'absolute',
    width: width,
    padding: 5,
    paddingHorizontal: 25,
    zIndex: 100,
    left: 0,
  };

  return (
    <View style={{...style.container, backgroundColor: background}}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        styles={Platform.OS === 'ios' ? (iosStyles as never) : (androidStyles as never)}
      />
      {isFetching ? (
        <Loading size={30} style={style.activityIndicator} />
      ) : (
        <FlatList
          columnWrapperStyle={style.flatListColumnWrapperStyle}
          data={searchedPokemons}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => (
            <Text
              style={{
                ...appTheme.title,
                ...appTheme.globalMargin,
                color: text,
                marginTop: Platform.OS === 'ios' ? 130 : 80,
              }}>
              {term}
            </Text>
          )}
          numColumns={2}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 10},
  activityIndicator: {marginTop: '50%'},
  flatListColumnWrapperStyle: {justifyContent: 'space-between'},
});

export default Search;
