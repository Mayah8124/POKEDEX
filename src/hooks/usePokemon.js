import { useState, useEffect } from "react";

const POKEAPI = "https://pokeapi.co/api/v2";

export function usePokemonList(limit = 20, offset = 0) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${POKEAPI}/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then(async (data) => {
        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        );
        setPokemons(details);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [limit, offset]);

  return { pokemons, loading, error };
}

export function usePokemon(nameOrId) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nameOrId) return;
    setLoading(true);
    fetch(`${POKEAPI}/pokemon/${nameOrId}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [nameOrId]);

  return { pokemon, loading, error };
}
