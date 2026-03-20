import { TYPE_COLORS } from "../hooks/useCustomPokemons";

const TYPE_TEXT = {
  fire: "Feu",
  water: "Eau",
  grass: "Plante",
  electric: "Électrique",
  normal: "Normal",
  ice: "Glace",
  fighting: "Combat",
  poison: "Poison",
  ground: "Sol",
  flying: "Vol",
  psychic: "Psy",
  bug: "Insecte",
  rock: "Roche",
  ghost: "Spectre",
  dragon: "Dragon",
  dark: "Ténèbres",
  steel: "Acier",
  fairy: "Fée",
};

export default function TypeBadge({ type }) {
  const color = TYPE_COLORS[type] || "#FFB7C5";
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white capitalize"
      style={{ backgroundColor: color }}
    >
      {TYPE_TEXT[type] || type}
    </span>
  );
}
