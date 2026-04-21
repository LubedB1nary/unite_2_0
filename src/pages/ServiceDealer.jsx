import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Icon } from '../components/shared/Icon.jsx';

const tiers = [
  {
    tier: 'Partner', price: '0%',
    perks: ['Drop-ship with your branded packing slip', 'Wholesale tier pricing', 'Monthly co-op marketing budget', 'Dedicated partner rep'],
  },
  {
    tier: 'Private Label', price: '+8%',
    perks: ['All Partner benefits', 'Custom packaging + label design', 'Dedicated SKU space in WMS', 'Quarterly portfolio review'],
    fav: true,
  },
  {
    tier: 'Import Co-Pilot', price: 'Custom',
    perks: ['Source on your behalf from vetted factories', 'FDA + GS1 + HTS validation', 'Flexport freight consolidation', 'Landed cost transparency'],
  },
];

export function ServiceDealer() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SERVICE · DEALER PROGRAM"
        title={<>Your catalog. <em>Our</em> import desk.</>}
        sub="White-label, drop-ship, and FDA-registered import — priced so regional distributors can finally compete on SKUs they couldn't carry before." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{ background: t.fav ? D.plum : D.card, color: t.fav ? D.paper : D.ink, borderRadius: 16, border: `1px solid ${t.fav ? D.plum : D.line}`, padding: 32 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: t.fav ? D.plumSoft : D.plum }}>{t.tier.toUpperCase()}</div>
              <div style={{ fontFamily: D.display, fontSize: 56, letterSpacing: -1.2, marginTop: 10, lineHeight: 1 }}>{t.price}</div>
              <div style={{ fontSize: 13, color: t.fav ? D.plumSoft : D.ink3, marginTop: 4 }}>markup over wholesale</div>
              <div style={{ height: 1, background: t.fav ? 'rgba(255,255,255,.2)' : D.line, margin: '22px 0' }} />
              {t.perks.map((p, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, padding: '8px 0', fontSize: 14 }}>
                  <Icon.check style={{ color: t.fav ? D.paper : D.plum, marginTop: 3 }} /> {p}
                </div>
              ))}
              <button style={{ marginTop: 20, width: '100%', background: t.fav ? D.paper : D.ink, color: t.fav ? D.plum : D.paper, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Apply</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
