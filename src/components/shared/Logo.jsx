import { D } from '../../tokens.js';

export function UMLogoMark({ size = 28, from = '#f64f00', to = '#a900aa', radius = 0.22 }) {
  const r = size * radius;
  return (
    <div style={{
      width: size, height: size, borderRadius: r,
      background: `linear-gradient(135deg, ${from}, ${to})`,
      position: 'relative', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)',
    }}>
      <svg width={size * 0.62} height={size * 0.5} viewBox="0 0 24 20" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v9a5 5 0 0 0 10 0V3" />
        <path d="M13 17V9l4 5 4-5v8" opacity="0.92" />
      </svg>
    </div>
  );
}

export function UMLogo({ size = 28, from = '#f64f00', to = '#a900aa', color = '#2a2530', weight = 600, mark = true, letterSpacing = -0.2 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {mark && <UMLogoMark size={size} from={from} to={to} />}
      <div style={{ fontWeight: weight, fontSize: size * 0.58, color, letterSpacing, lineHeight: 1, fontFamily: D.sans }}>
        Unite <span style={{ opacity: 0.65, fontWeight: weight - 100 }}>Medical</span>
      </div>
    </div>
  );
}
