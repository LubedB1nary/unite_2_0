import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { useViewport } from '../lib/viewport.js';
import { IMG } from '../lib/imageMap.js';

const courses = [
  { name: 'Certified Fitter · Orthotic', ceu: '16 CEU', date: 'May 14-15', price: 890, online: false },
  { name: 'HCPCS Level II · L-codes deep dive', ceu: '8 CEU', date: 'May 22', price: 420, online: true },
  { name: 'PDAC Submission Masterclass', ceu: '6 CEU', date: 'Jun 04', price: 380, online: true },
  { name: 'ASC Materials Management · 2026', ceu: '20 CEU', date: 'Jun 18-19', price: 1240, online: false },
  { name: 'Wound Care: selection & billing', ceu: '12 CEU', date: 'Jul 09', price: 680, online: false },
  { name: 'Incontinence product formulary', ceu: '4 CEU', date: 'Jul 16', price: 240, online: true },
];

export function ServiceEducation() {
  const { isMobile, isTablet } = useViewport();
  const padX = isMobile ? 20 : 40;
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="SERVICE · EDUCATION"
        title={<>The <em>curriculum</em>.</>}
        sub="In-person labs in Atlanta, live online for everyone else. Every course is CEU-approved; every instructor has actually done the job." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: `32px ${padX}px ${isMobile ? 56 : 80}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3,1fr)', gap: 14 }}>
          {courses.map((c, i) => (
            <div key={i} style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
              <PhotoPlaceholder src={c.online ? IMG.EDU_ONLINE : IMG.EDU_IN_PERSON} caption={c.online ? 'live online' : 'Atlanta lab'} height={160} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} radius={0} />
              <div style={{ padding: 22 }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{c.ceu} · {c.online ? 'LIVE ONLINE' : 'IN-PERSON'}</div>
                <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, marginTop: 10, minHeight: 62, lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: D.ink2, fontFamily: D.mono }}>{c.date.toUpperCase()}</div>
                    <div style={{ fontFamily: D.display, fontSize: 24, color: D.plum, letterSpacing: -0.4, marginTop: 4 }}>${c.price}</div>
                  </div>
                  <button style={{ background: D.ink, color: D.paper, border: 'none', padding: '10px 14px', borderRadius: 999, fontSize: 12, cursor: 'pointer' }}>Enroll</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
