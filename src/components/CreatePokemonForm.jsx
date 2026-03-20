import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_TYPES = [
  "normal", "fire", "water", "grass", "electric", "ice",
  "fighting", "poison", "ground", "flying", "psychic",
  "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

const TYPE_LABELS = {
  normal: "Normal", fire: "Feu", water: "Eau", grass: "Plante",
  electric: "Électrique", ice: "Glace", fighting: "Combat", poison: "Poison",
  ground: "Sol", flying: "Vol", psychic: "Psy", bug: "Insecte",
  rock: "Roche", ghost: "Spectre", dragon: "Dragon", dark: "Ténèbres",
  steel: "Acier", fairy: "Fée",
};

const DEFAULT_FORM = {
  name: "", imageUrl: "", types: ["normal"],
  hp: "50", attack: "50", defense: "50", speed: "50",
  height: "10", weight: "100",
};

export default function CreatePokemonForm({ onSubmit, onClose }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  function toggleType(type) {
    setForm((prev) => {
      const has = prev.types.includes(type);
      if (has && prev.types.length === 1) return prev;
      if (has) return { ...prev, types: prev.types.filter((t) => t !== type) };
      if (prev.types.length >= 2) return { ...prev, types: [prev.types[1], type] };
      return { ...prev, types: [...prev.types, type] };
    });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Le nom est requis";
    if (form.types.length === 0) e.types = "Au moins un type requis";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(form);
    setForm(DEFAULT_FORM);
    setErrors({});
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl shadow-pink-200 max-w-md w-full p-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-extrabold text-gray-800">Créer un Pokémon</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Nom *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex : Flamikou"
              className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">URL de l'image (facultatif)</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Types (max 2) *</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`px-2 py-1 rounded-full text-xs font-semibold border transition-all ${
                    form.types.includes(type)
                      ? "bg-pink-400 text-white border-pink-400 shadow-sm"
                      : "bg-white text-gray-500 border-pink-200 hover:border-pink-300"
                  }`}
                >
                  {TYPE_LABELS[type]}
                </button>
              ))}
            </div>
            {errors.types && <p className="text-red-400 text-xs mt-1">{errors.types}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "PV", key: "hp" },
              { label: "Attaque", key: "attack" },
              { label: "Défense", key: "defense" },
              { label: "Vitesse", key: "speed" },
            ].map((s) => (
              <div key={s.key}>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{s.label}</label>
                <input
                  type="number"
                  min="1"
                  max="255"
                  value={form[s.key]}
                  onChange={(e) => setForm({ ...form, [s.key]: e.target.value })}
                  className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Taille (dm)</label>
              <input
                type="number" min="1"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value })}
                className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Poids (hg)</label>
              <input
                type="number" min="1"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl py-3 transition-colors shadow-md shadow-pink-200"
          >
            Créer le Pokémon 
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
