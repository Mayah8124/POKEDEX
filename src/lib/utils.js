import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const TYPE_COLORS = {
  Plante: "#78C850",
  Feu: "#F08030",
  Eau: "#6890F0",
  Insecte: "#A8B820",
  Normal: "#A8A878",
  Électrik: "#F8D030",
  Poison: "#A040A0",
  Fée: "#EE99AC",
  Vol: "#A890F0",
  Combat: "#C03028",
  Psy: "#F85888",
  Sol: "#E0C068",
  Roche: "#B8A038",
  Spectre: "#705898",
  Glace: "#98D8D8",
  Dragon: "#7038F8",
  Ténèbres: "#705848",
  Acier: "#B8B8D0",
};

export const ALL_TYPES = Object.keys(TYPE_COLORS);

export function getTypeColor(type) {
  return TYPE_COLORS[type] || "#A8A878";
}

export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}