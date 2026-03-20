import { motion } from "framer-motion";
import TypeBadge from "./TypeBadge";

const TYPE_BG = {
  fire: "from-red-100 to-orange-50",
  water: "from-blue-100 to-cyan-50",
  grass: "from-green-100 to-emerald-50",
  electric: "from-yellow-100 to-amber-50",
  normal: "from-gray-100 to-slate-50",
  ice: "from-cyan-100 to-sky-50",
  fighting: "from-red-200 to-red-50",
  poison: "from-purple-100 to-fuchsia-50",
  ground: "from-yellow-200 to-yellow-50",
  flying: "from-indigo-100 to-purple-50",
  psychic: "from-pink-100 to-rose-50",
  bug: "from-lime-100 to-green-50",
  rock: "from-stone-200 to-stone-50",
  ghost: "from-purple-200 to-indigo-50",
  dragon: "from-violet-200 to-purple-50",
  dark: "from-gray-300 to-gray-100",
  steel: "from-slate-200 to-slate-50",
  fairy: "from-pink-100 to-rose-50",
};

function getTypeBg(types) {
  const first = types?.[0]?.type?.name || "normal";
  return TYPE_BG[first] || "from-pink-50 to-white";
}

export default function PokemonCard({ pokemon, onClick, onDelete, isSelected }) {
  const bg = getTypeBg(pokemon.types);
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    null;

  const num = pokemon.isCustom ? "★" : `#${String(pokemon.id).padStart(3, "0")}`;

  function handleDelete(e) {
    e.stopPropagation();
    onDelete(pokemon.id);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(pokemon)}
      className={`relative cursor-pointer rounded-2xl bg-gradient-to-br ${bg} border-2 ${
        isSelected ? "border-pink-400 shadow-lg shadow-pink-200" : "border-pink-100"
      } p-4 flex flex-col items-center gap-2 transition-shadow`}
      layout
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-bold text-pink-300">{num}</span>
        {pokemon.isCustom && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleDelete}
            className="w-5 h-5 rounded-full bg-red-400 hover:bg-red-500 text-white text-xs flex items-center justify-center leading-none shadow-sm transition-colors"
            title="Supprimer ce Pokémon"
          >
            ×
          </motion.button>
        )}
      </div>
      {image ? (
        <img
          src={image}
          alt={pokemon.name}
          className="w-20 h-20 object-contain drop-shadow-md"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-4xl">
          ?
        </div>
      )}
      <p className="text-sm font-bold text-gray-700 capitalize">{pokemon.displayName || pokemon.name}</p>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types?.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </motion.div>
  );
}
