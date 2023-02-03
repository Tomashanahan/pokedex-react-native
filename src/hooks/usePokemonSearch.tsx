/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemon.api';
import {PokemonPaginatedResponse, SimplePokemon, Result} from '../interfaces/Pokemon.interface';

function usePokemonSearch() {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

  const loadPokemons = async () => {
    const {data} = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');

    setSimplePokemonList(mapPokemonList(data.results));
    setIsFetching(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlPath = url.split('/');
      const id = urlPath[urlPath.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        name,
        picture,
      };
    });

    return newPokemonList;
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {isFetching, simplePokemonList, loadPokemons};
}

export default usePokemonSearch;
