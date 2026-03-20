import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatId, getTypeColor } from "../lib/utils";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";

export function PokemonHeader({ pokemon, onPrev, onNext }) {
  const bgColor = getTypeColor(pokemon.apiTypes[0]?.name);

  return (
    <div className="w-full relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${bgColor}18 0%, #fff9fb 100%)` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          <div className="flex flex-col items-center gap-4 lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.img
                key={pokemon.id}
                src={pokemon.image}
                alt={pokemon.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
                className="w-52 h-52 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
              />
            </AnimatePresence>
            <div className="flex gap-4">
              <button
                onClick={onPrev}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={onNext}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition-all"
              >
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${pokemon.id}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-display font-bold text-3xl text-muted-foreground/30 mb-1">
                  {formatId(pokemon.pokedexId || pokemon.id)}
                </p>
                <h1 className="font-display font-bold text-5xl sm:text-6xl text-foreground mb-5">
                  {pokemon.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-8">
                  {pokemon.apiTypes.map((type) => (
                    <TypeBadge key={type.name} type={type} size="lg" />
                  ))}
                </div>
                <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm">
                  <h2 className="font-display font-semibold text-lg mb-5 text-foreground">Base Stats</h2>
                  <div className="space-y-3">
                    <StatBar label="HP" value={pokemon.stats.HP} />
                    <StatBar label="ATK" value={pokemon.stats.attack} />
                    <StatBar label="DEF" value={pokemon.stats.defense} />
                    <StatBar label="SPA" value={pokemon.stats.special_attack} />
                    <StatBar label="SPD" value={pokemon.stats.special_defense} />
                    <StatBar label="SPE" value={pokemon.stats.speed} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}