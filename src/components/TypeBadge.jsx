import { getTypeColor } from "../lib/utils";

export function TypeBadge({ type, size = "md" }) {
  const color = getTypeColor(type.name);

  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
    lg: "px-4 py-1.5 text-base gap-2",
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full text-white font-bold shadow-sm ${sizes[size]}`}
      style={{ backgroundColor: color }}
    >
      {type.image && (
        <img src={type.image} alt={type.name} className={`${iconSize[size]} object-contain`} />
      )}
      {type.name}
    </span>
  );
}