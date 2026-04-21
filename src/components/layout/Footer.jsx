import { D } from '../../tokens.js';
import { UMLogo } from '../shared/Logo.jsx';

export function Footer() {
  return (
    <div style={{ background: D.plum, color: D.paper, padding: '64px 40px 32px' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <UMLogo size={30} color={D.paper} weight={500} />
            <div style={{ marginTop: 18, maxWidth: 320, fontSize: 14, lineHeight: 1.6, color: D.plumSoft }}>
              Veteran-owned wholesale medical supply. Built for the channels the Big 3 can't serve well.
            </div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plumSoft, marginTop: 28 }}>
              VOSB · FDA 3015727296 · CAGE 8MK70
            </div>
          </div>
          {[
            ['Catalog', ['Orthotics', 'Diagnostics', 'PPE', 'Wound Care']],
            ['Solutions', ['ASCs', 'Pharmacies', 'Government', 'Distributors']],
            ['Company', ['About', 'Veteran Owned', 'Compliance', 'Contact']],
          ].map(([h, items]) => (
            <div key={h}>
              <div style={{ fontFamily: D.display, fontSize: 20, letterSpacing: -0.3, marginBottom: 16 }}>{h}</div>
              {items.map((i) => <div key={i} style={{ fontSize: 14, color: D.plumSoft, marginBottom: 10 }}>{i}</div>)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.14)', fontFamily: D.mono, fontSize: 11, color: D.plumSoft, display: 'flex', justifyContent: 'space-between' }}>
          <div>© 2026 Unite Medical Supply</div>
          <div>1487 Trae Lane · Lithia Springs, GA 30122</div>
        </div>
      </div>
    </div>
  );
}
