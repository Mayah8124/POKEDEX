import { useState, useCallback } from "react";
import { ALL_TYPES } from "../lib/utils";

const STORAGE_KEY = "custom_pokemon";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function useCustomPokemon() {
  const [list, setList] = useState(load);

  const add = useCallback((data) => {
    const pokemon = { ...data, id: `custom-${Date.now()}`, isCustom: true };
    setList((prev) => {
      const next = [...prev, pokemon];
      save(next);
      return next;
    });
    return pokemon;
  }, []);

  const remove = useCallback((id) => {
    setList((prev) => {
      const next = prev.filter((p) => p.id !== id);
      save(next);
      return next;
    });
  }, []);

  return { list, add, remove };
}

export { ALL_TYPES };