import { motion, AnimatePresence } from "framer-motion";
import TypeBadge from "./TypeBadge";

export default function PokemonHeader({ pokemon }) {
  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-pink-300">
        <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center text-5xl animate-pulse">
          ?
        </div>
        <p className="mt-4 text-lg font-semibold">Sélectionne un Pokémon</p>
      </div>
    );
  }

  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    null;

  const num = pokemon.isCustom ? "★ Personnalisé" : `#${String(pokemon.id).padStart(3, "0")}`;

  const statsMap = {};
  pokemon.stats?.forEach((s) => {
    statsMap[s.stat.name] = s.base_stat;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pokemon.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-6"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative"
        >
          {image ? (
            <img
              src={image}
              alt={pokemon.name}
              className="w-36 h-36 object-contain drop-shadow-xl"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-pink-100 flex items-center justify-center text-6xl">
              ?
            </div>
          )}
        </motion.div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-bold text-pink-300 uppercase tracking-widest">{num}</p>
          <h1 className="text-3xl font-extrabold text-gray-800 capitalize mt-1">
            {pokemon.displayName || pokemon.name}
          </h1>
          <div className="flex gap-2 mt-2 justify-center sm:justify-start flex-wrap">
            {pokemon.types?.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { label: "PV", key: "hp" },
              { label: "Attaque", key: "attack" },
              { label: "Défense", key: "defense" },
              { label: "Vitesse", key: "speed" },
            ].map((s) => (
              <div key={s.key} className="bg-white/60 rounded-xl p-2 text-center shadow-sm">
                <p className="text-xs text-pink-400 font-semibold">{s.label}</p>
                <p className="text-lg font-bold text-gray-700">{statsMap[s.key] ?? "—"}</p>
                <div className="mt-1 h-1.5 rounded-full bg-pink-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((statsMap[s.key] / 150) * 100, 100)}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-pink-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
