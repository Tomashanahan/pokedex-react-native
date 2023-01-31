/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemon.api';
import {PokemonPaginatedResponse, SimplePokemon, Result} from '../interfaces/Pokemon.interface';

function useInfinitePokemon() {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

  const nextPokemonRef = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = async () => {
    const {data} = await pokemonApi.get<PokemonPaginatedResponse>(nextPokemonRef.current);

    nextPokemonRef.current = data.next;
    setSimplePokemonList([...simplePokemonList, ...mapPokemonList(data.results)]);
    setIsLoading(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlPath = url.split('/');
      const id = urlPath[urlPath.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        // color,
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

  return {isLoading, simplePokemonList, loadPokemons};
}

export default useInfinitePokemon;
