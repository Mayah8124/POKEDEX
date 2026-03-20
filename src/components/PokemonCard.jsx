import { motion } from "framer-motion";
import { formatId } from "../lib/utils";
import { TypeBadge } from "./TypeBadge";

export function PokemonCard({ pokemon, isSelected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-200
        ${isSelected
          ? "bg-white shadow-xl shadow-primary/20 ring-4 ring-primary/30"
          : "bg-white/70 hover:bg-white border border-white shadow-md hover:shadow-lg hover:shadow-primary/10"
        }`}
    >
      <span className="absolute top-3 right-3 font-bold text-muted-foreground/25 text-lg">
        {formatId(pokemon.pokedexId || pokemon.id)}
      </span>

      <div className="flex flex-col items-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24 object-contain drop-shadow-lg mb-2"
          loading="lazy"
        />
        <h3 className="font-display font-bold text-base text-foreground mb-2 text-center">
          {pokemon.name}
        </h3>
        <div className="flex flex-wrap gap-1 justify-center">
          {pokemon.apiTypes.map((type) => (
            <TypeBadge key={type.name} type={type} size="sm" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}