import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Plus, Trash2, Sparkles, Loader2 } from "lucide-react";
import { usePokemon } from "../hooks/usePokemon";
import { useCustomPokemon } from "../hooks/useCustomPokemon";
import { PokemonHeader } from "../components/PokemonHeader";
import { PokemonCard } from "../components/PokemonCard";
import { CreatePokemonModal } from "../components/CreatePokemonModal";

export default function Home() {
  const { data: official = [], isLoading, isError } = usePokemon(151);
  const { list: custom, add, remove } = useCustomPokemon();

  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const all = useMemo(() => [...custom, ...official], [custom, official]);
  const activeId = selectedId ?? all[0]?.id;
  const selected = useMemo(() => all.find((p) => p.id === activeId) ?? all[0], [all, activeId]);

  const handleSelect = (id) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!all.length) return;
    const i = all.findIndex((p) => p.id === activeId);
    setSelectedId(all[(i + 1) % all.length].id);
  };

  const handlePrev = () => {
    if (!all.length) return;
    const i = all.findIndex((p) => p.id === activeId);
    setSelectedId(all[(i - 1 + all.length) % all.length].id);
  };

  const q = search.toLowerCase().trim();
  const filteredOfficial = official.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || String(p.pokedexId) === q || p.apiTypes.some((t) => t.name.toLowerCase().includes(q))
  );
  const filteredCustom = custom.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.apiTypes.some((t) => t.name.toLowerCase().includes(q))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="font-display text-xl text-primary animate-pulse">Chargement…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <span className="text-6xl">⚠️</span>
        <p className="text-red-500 font-semibold">Impossible de charger les Pokémon.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-primary text-white rounded-2xl font-semibold">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        
      {selected && (
        <PokemonHeader pokemon={selected} onPrev={handlePrev} onNext={handleNext} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">

        {custom.length > 0 && (
          <section className="mt-10 mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              ✨ Mes Pokémon
              <span className="text-base font-normal text-muted-foreground">({custom.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredCustom.map((p) => (
                <div key={p.id} className="relative group">
                  <PokemonCard pokemon={p} isSelected={p.id === activeId} onClick={() => handleSelect(p.id)} />
                  <span className="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Custom
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); remove(p.id); if (p.id === activeId) setSelectedId(null); }}
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 p-1.5 bg-white rounded-full shadow text-red-400 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-10 mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Kanto Region
            </h2>
            <p className="text-muted-foreground mt-1">
              151 Pokémon officiels
              {custom.length > 0 && ` · ${custom.length} personnalisé${custom.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nom, ID ou type…"
                className="pl-11 pr-4 py-3 w-56 rounded-2xl bg-white border-2 border-transparent focus:border-primary focus:outline-none focus:ring-4 focus:ring-pink-100 shadow-sm transition-all"
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition shadow-lg shadow-primary/25"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Créer</span>
            </button>
          </div>
        </div>

        {filteredOfficial.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {filteredOfficial.map((p) => (
              <PokemonCard key={p.id} pokemon={p} isSelected={p.id === activeId} onClick={() => handleSelect(p.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl bg-white/60">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-display text-xl font-bold text-foreground">Aucun résultat</h3>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CreatePokemonModal
              onClose={() => setShowModal(false)}
              onAdd={(data) => {
                const created = add(data);
                setSelectedId(created.id);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}