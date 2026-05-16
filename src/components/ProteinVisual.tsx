export default function ProteinVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 via-sky-50 to-teal-50",
        compact ? "h-48" : "h-[390px]",
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-70">
        {Array.from({ length: 42 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-blue-400/40 blur-[1px]"
            style={{
              width: `${28 + ((i * 7) % 38)}px`,
              height: `${28 + ((i * 7) % 38)}px`,
              left: `${5 + ((i * 13) % 85)}%`,
              top: `${8 + ((i * 19) % 78)}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute left-[28%] top-[42%] h-5 w-5 rounded-full bg-teal-500 shadow-lg" />
      <div className="absolute left-[38%] top-[48%] h-4 w-4 rounded-full bg-orange-400 shadow-lg" />
      <div className="absolute left-[50%] top-[40%] h-4 w-4 rounded-full bg-purple-500 shadow-lg" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400">
        <path
          d="M220 220 C280 120, 360 300, 450 170 S620 260, 690 130"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M260 230 C320 250, 390 150, 470 190 S560 200, 650 150"
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeDasharray="12 12"
          strokeLinecap="round"
        />
      </svg>

      {!compact && (
        <>
          <div className="absolute left-[22%] top-[33%] rounded-xl bg-white px-3 py-2 text-xs font-black shadow">
            His95
          </div>
          <div className="absolute left-[55%] top-[30%] rounded-xl bg-white px-3 py-2 text-xs font-black shadow">
            Asp33
          </div>
          <div className="absolute left-[45%] top-[66%] rounded-xl bg-white px-3 py-2 text-xs font-black shadow">
            Gly68
          </div>
        </>
      )}

      <div className="absolute bottom-4 left-4 rounded-2xl bg-white/80 px-4 py-2 text-xs font-bold text-slate-600 shadow-sm backdrop-blur">
        Protein pocket + docked ligand preview
      </div>
    </div>
  );
}
