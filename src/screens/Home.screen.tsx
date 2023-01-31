/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {ActivityIndicator, FlatList, Image, Platform, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {appTheme} from '../theme/app.theme';
import PokemonCard from '../components/PokemonCard';
import useInfinitePokemon from '../hooks/useInfinitePokemon';
import {useContext} from 'react';
import {ThemeContext} from '../context/Theme/Theme.context';

function Home() {
  const {top} = useSafeAreaInsets();
  const {theme} = useContext(ThemeContext);
  const {simplePokemonList, loadPokemons} = useInfinitePokemon();

  return (
    <View style={{paddingTop: top, ...style.container, backgroundColor: theme.colors.background}}>
      <FlatList
        columnWrapperStyle={style.flatListColumnWrapperStyle}
        data={simplePokemonList}
        keyExtractor={item => item.id}
        ListFooterComponent={() => <ActivityIndicator size={40} style={style.activityIndicator} />}
        ListHeaderComponent={() => (
          <Text style={{...appTheme.title, ...appTheme.globalMargin, color: theme.colors.text}}>Home</Text>
        )}
        numColumns={2}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        style={Platform.OS === 'ios' && style.flatList}
      />
      <Image style={appTheme.pokebolaBG} source={require('../assets/pokebola.png')} />
    </View>
  );
}

const style = StyleSheet.create({
  activityIndicator: {height: 50, width: 50, alignSelf: 'center'},
  container: {},
  flatList: {},
  flatListColumnWrapperStyle: {justifyContent: 'space-around'},
});

export default Home;
