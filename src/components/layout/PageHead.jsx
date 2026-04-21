import { D } from '../../tokens.js';

export function PageHead({ eyebrow, title, sub, right }) {
  return (
    <div style={{ padding: '72px 40px 32px', background: D.paper }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: right ? '1.4fr 1fr' : '1fr', gap: 56, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 22 }}>{eyebrow}</div>
          <h1 style={{ fontFamily: D.display, fontSize: 92, fontWeight: 400, lineHeight: 0.96, letterSpacing: -2.3, margin: 0 }}>{title}</h1>
          {sub && <div style={{ fontSize: 17, lineHeight: 1.55, color: D.ink2, marginTop: 22, maxWidth: 600 }}>{sub}</div>}
        </div>
        {right}
      </div>
    </div>
  );
}
