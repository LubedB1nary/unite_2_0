import { D } from '../../tokens.js';
import { Nav } from '../../components/layout/Nav.jsx';
import { Footer } from '../../components/layout/Footer.jsx';
import { PageHead } from '../../components/layout/PageHead.jsx';
import { PhotoPlaceholder } from '../../components/shared/PhotoPlaceholder.jsx';
import { Grad } from '../../components/shared/Grad.jsx';
import { useViewport } from '../../lib/viewport.js';
import { useSEO } from '../../lib/seo.js';
import { EMS_BUNDLE_IMG } from '../../lib/imageMap.js';

export function SegmentEMS() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  useSEO({
    title: 'First Responders & EMS — trauma kits, NFPA-aligned restock',
    description:
      'CoTCCC-compliant IFAKs, mass-casualty rapid-response packs, monthly per-rig restock subscriptions. Built by an Army logistics officer for fire, EMS, and law enforcement.',
    canonical: '/segments/ems',
  });
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SEGMENT · FIRST RESPONDERS & EMS · TAM $3-5B"
        title={<>Gear that <em>shows up</em>.</>}
        sub="Trauma kits, PPE bundles, and emergency preparedness stock — spec'd to NFPA and NAEMT protocols. Built by an Army logistics officer." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `32px ${padX}px ${isMobile ? 56 : 80}px`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 14 }}>
        {[{ name: 'MARCH Algorithm Trauma Kit', spec: 'CoTCCC-compliant · IFAK form factor', items: 18, price: 312 }, { name: 'Mass Casualty Rapid Response', spec: '10-patient treatment · rolling case', items: 142, price: 4820 }, { name: 'EMS Truck Restock Bundle', spec: 'Monthly subscription · per-rig', items: 64, price: 980 }, { name: 'Fire Dept · EMS Ready Pack', spec: 'NFPA 1917 aligned', items: 48, price: 1420 }].map((b, i) => (
          <div key={i} style={{ background: D.card, borderRadius: 16, border: `1px solid ${D.line}`, overflow: 'hidden', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr' }}>
            <PhotoPlaceholder src={EMS_BUNDLE_IMG[i]} caption={b.name.toLowerCase()} height={isMobile ? 140 : 200} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} radius={0} />
            <div style={{ padding: isMobile ? 20 : 24 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{b.items} SKUS</div>
              <div style={{ fontFamily: D.display, fontSize: 24, letterSpacing: -0.4, marginTop: 10, lineHeight: 1.15 }}>{b.name}</div>
              <div style={{ fontSize: 13, color: D.ink2, marginTop: 6 }}>{b.spec}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 20 }}>
                <div style={{ fontFamily: D.display, fontSize: 28, color: D.plum, letterSpacing: -0.5 }}>${b.price.toLocaleString()}</div>
                <button style={{ background: D.ink, color: D.paper, border: 'none', padding: '10px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>Request pricing</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
