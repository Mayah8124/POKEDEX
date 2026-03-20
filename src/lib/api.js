export async function fetchPokemonList(limit = 151) {
  const url = `https://pokebuildapi.fr/api/v1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Impossible de charger les Pokémon");
  return res.json();
}
