const BASE_URL = "https://pokeapi.co/api/v2";
const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const TYPE_FR = {
  fire: "Feu", water: "Eau", grass: "Plante", electric: "Électrik",
  psychic: "Psy", ice: "Glace", dragon: "Dragon", dark: "Ténèbres",
  fairy: "Fée", normal: "Normal", fighting: "Combat", flying: "Vol",
  poison: "Poison", ground: "Sol", rock: "Roche", bug: "Insecte",
  ghost: "Spectre", steel: "Acier",
};

const TYPE_ICONS = {
  fire: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Fire.png",
  water: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Water.png",
  grass: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Grass.png",
  electric: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Electric.png",
  psychic: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Psychic.png",
  ice: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Ice.png",
  dragon: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Dragon.png",
  dark: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Dark.png",
  fairy: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Fairy.png",
  normal: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Normal.png",
  fighting: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Fighting.png",
  flying: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Flying.png",
  poison: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Poison.png",
  ground: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Ground.png",
  rock: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Rock.png",
  bug: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Bug.png",
  ghost: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Ghost.png",
  steel: "https://raw.githubusercontent.com/duianto/pokedex-types/main/assets/icons/Steel.png",
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function transformPokemon(data) {
  const stats = {};
  for (const s of data.stats) {
    stats[s.stat.name] = s.base_stat;
  }

  return {
    id: data.id,
    pokedexId: data.id,
    name: capitalize(data.name),
    image:
      data.sprites?.other?.["official-artwork"]?.front_default ||
      `${SPRITE_BASE}/${data.id}.png`,
    sprite: `${SPRITE_BASE}/${data.id}.png`,
    apiTypes: data.types.map((t) => ({
      name: TYPE_FR[t.type.name] || capitalize(t.type.name),
      image: TYPE_ICONS[t.type.name] || "",
    })),
    stats: {
      HP: stats["hp"] ?? 0,
      attack: stats["attack"] ?? 0,
      defense: stats["defense"] ?? 0,
      special_attack: stats["special-attack"] ?? 0,
      special_defense: stats["special-defense"] ?? 0,
      speed: stats["speed"] ?? 0,
    },
    apiEvolutions: [],
    apiPreEvolution: "none",
  };
}

export async function fetchPokemonList(limit = 151) {
  const listRes = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`);
  if (!listRes.ok) throw new Error("Impossible de charger la liste des Pokémon");
  const listData = await listRes.json();

  const details = await Promise.all(
    listData.results.map(async (p) => {
      const res = await fetch(p.url);
      if (!res.ok) throw new Error(`Impossible de charger ${p.name}`);
      const data = await res.json();
      return transformPokemon(data);
    })
  );

  return details;
}