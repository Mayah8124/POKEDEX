import { useState } from "react";

const TYPE_COLORS = {
  fire: "#FF6B6B",
  water: "#4ECDC4",
  grass: "#6BCB77",
  electric: "#FFE66D",
  normal: "#A8A878",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export function useCustomPokemons() {
  const [customPokemons, setCustomPokemons] = useState([]);

  function addPokemon(formData) {
    const id = Date.now();
    const newPokemon = {
      id,
      name: formData.name.toLowerCase(),
      displayName: formData.name,
      sprites: {
        front_default: formData.imageUrl || "./assets/images/pokeballimage.png",
      },
      types: formData.types.map((t) => ({
        type: { name: t },
      })),
      stats: [
        { base_stat: parseInt(formData.hp) || 50, stat: { name: "hp" } },
        { base_stat: parseInt(formData.attack) || 50, stat: { name: "attack" } },
        { base_stat: parseInt(formData.defense) || 50, stat: { name: "defense" } },
        { base_stat: parseInt(formData.speed) || 50, stat: { name: "speed" } },
      ],
      height: parseInt(formData.height) || 10,
      weight: parseInt(formData.weight) || 100,
      isCustom: true,
      typeColor: TYPE_COLORS[formData.types[0]] || "#FFB7C5",
    };
    setCustomPokemons((prev) => [newPokemon, ...prev]);
    return newPokemon;
  }

  function removePokemon(id) {
    setCustomPokemons((prev) => prev.filter((p) => p.id !== id));
  }

  return { customPokemons, addPokemon, removePokemon };
}

export { TYPE_COLORS };
