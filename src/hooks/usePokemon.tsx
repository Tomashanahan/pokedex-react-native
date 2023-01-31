/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';

import {pokemonApi} from '../api/pokemon.api';
import {PokemonDetail} from '../interfaces/Pokemon.interface';

function usePokemon(id: string) {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>({} as PokemonDetail);
  const [isLoading, setIsLoading] = useState(true);

  const loadPokemonDetail = async () => {
    const {data} = await pokemonApi.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`);

    setPokemonDetail(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemonDetail();
  }, [id]);

  return {pokemonDetail, isLoading};
}

export default usePokemon;
