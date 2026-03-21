import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePokemonList, usePokemon } from "../hooks/usePokemon";
import { useCustomPokemons } from "../hooks/useCustomPokemons";
import PokemonHeader from "../components/PokemonHeader";
import PokemonCard from "../components/PokemonCard";
import CreatePokemonForm from "../components/CreatePokemonForm";
import pokemonLogo from "../../public/assets/images/pokemon-logo.png";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { pokemons, loading } = usePokemonList(20, 0);
  const { pokemon: defaultPokemon } = usePokemon("bulbasaur");
  const { customPokemons, addPokemon, removePokemon } = useCustomPokemons();

  const displayed = selectedPokemon || defaultPokemon;

  function handleSelect(pokemon) {
    setSelectedPokemon(pokemon);
  }

  function handleCreate(formData) {
    const created = addPokemon(formData);
    setSelectedPokemon(created);
  }

  function handleDelete(id) {
    removePokemon(id);
    if (selectedPokemon?.isCustom && selectedPokemon?.id === id) {
      setSelectedPokemon(null);
    }
  }

  const allPokemons = [...customPokemons, ...pokemons];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-6">

        <header className="mb-6 text-center items-center flex flex-col gap-2">
          <div>
            <motion.img
              src={pokemonLogo}
              alt="Pokemon Logo"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[40vw] object-contain"
            />
          </div>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-md text-pink-300 mt-1 font-bold"
          >
            Découvre tous les Pokémon
          </motion.p>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-pink-100 border border-pink-100 p-5 mb-6"
        >
          <PokemonHeader pokemon={displayed} />
        </motion.section>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-700">Liste des Pokémon</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-bold px-4 py-2 rounded-2xl text-sm shadow-md shadow-pink-200 transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            Créer un Pokémon
          </motion.button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-pink-50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {allPokemons.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.isCustom ? "custom-" : ""}${pokemon.id}`}
                pokemon={pokemon}
                onClick={handleSelect}
                onDelete={handleDelete}
                isSelected={selectedPokemon?.id === pokemon.id && selectedPokemon?.isCustom === pokemon.isCustom}
              />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <CreatePokemonForm
            onSubmit={handleCreate}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
