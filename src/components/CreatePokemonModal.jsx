import { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { ALL_TYPES, getTypeColor } from "../lib/utils";

const DEFAULT_STATS = { hp: 50, attack: 50, defense: 50, specialAttack: 50, specialDefense: 50, speed: 50 };

const STAT_LABELS = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Attaque" },
  { key: "defense", label: "Défense" },
  { key: "specialAttack", label: "Attaque Spé." },
  { key: "specialDefense", label: "Défense Spé." },
  { key: "speed", label: "Vitesse" },
];

export function CreatePokemonModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [type1, setType1] = useState("Normal");
  const [type2, setType2] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [imgError, setImgError] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("Le nom est obligatoire."); return; }
    if (type2 && type2 === type1) { setError("Les deux types doivent être différents."); return; }
    setError("");

    const types = [{ name: type1, image: "" }];
    if (type2) types.push({ name: type2, image: "" });

    onAdd({
      name: name.trim(),
      pokedexId: null,
      image: imageUrl.trim(),
      apiTypes: types,
      stats: {
        HP: stats.hp,
        attack: stats.attack,
        defense: stats.defense,
        special_attack: stats.specialAttack,
        special_defense: stats.specialDefense,
        speed: stats.speed,
      },
      apiEvolutions: [],
      apiPreEvolution: "none",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
          <h2 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Créer un Pokémon
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-8 py-6 space-y-6">

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Nom <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Flamochi, Aquaroc…"
              maxLength={30}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Type principal <span className="text-primary">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType1(t)}
                    style={{ backgroundColor: getTypeColor(t) }}
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white transition-all ${
                      type1 === t ? "ring-2 ring-offset-2 ring-gray-300 scale-110" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Type secondaire <span className="text-muted-foreground font-normal">(optionnel)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setType2("")}
                  className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${
                    type2 === "" ? "border-gray-600 text-gray-600" : "border-gray-200 text-gray-400"
                  }`}
                >
                  Aucun
                </button>
                {ALL_TYPES.filter((t) => t !== type1).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType2(t)}
                    style={{ backgroundColor: getTypeColor(t) }}
                    className={`px-3 py-1 rounded-full text-xs font-bold text-white transition-all ${
                      type2 === t ? "ring-2 ring-offset-2 ring-gray-300 scale-110" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Image <span className="text-muted-foreground font-normal">(URL optionnelle)</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => { setImageUrl(e.target.value); setImgError(false); }}
                placeholder="https://exemple.com/pokemon.png"
                className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all text-sm"
              />
              <div className="w-14 h-14 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                {imageUrl && !imgError ? (
                  <img
                    src={imageUrl}
                    alt="aperçu"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-2xl">🔮</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-4">Statistiques</label>
            <div className="space-y-3">
              {STAT_LABELS.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="w-28 text-sm font-semibold text-muted-foreground shrink-0">{label}</span>
                  <input
                    type="range"
                    min={1}
                    max={255}
                    value={stats[key]}
                    onChange={(e) => setStats((prev) => ({ ...prev, [key]: parseInt(e.target.value, 10) }))}
                    className="flex-1 accent-pink-400"
                  />
                  <span className="w-8 text-right font-bold text-sm">{stats[key]}</span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-2xl">{error}</p>
          )}

          <div className="flex gap-3 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border-2 border-gray-200 font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}