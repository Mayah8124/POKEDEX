import {motion} from "framer-motion";

export function StatBar({ label, value, max = 255 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  let barColor;
  if (pct < 20) barColor = "bg-rose-400";
  else if (pct < 40) barColor = "bg-orange-400";
  else if (pct < 60) barColor = "bg-yellow-400";
  else if (pct < 80) barColor = "bg-emerald-400";
  else barColor = "bg-cyan-400";

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-10 text-xs font-bold text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="w-8 text-right font-bold text-foreground">{value}</span>
      <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  );
}