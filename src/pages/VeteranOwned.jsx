import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { useViewport } from '../lib/viewport.js';
import { useSEO } from '../lib/seo.js';
import { IMG } from '../lib/imageMap.js';

const PILLARS = [
  { t: 'Service-Disabled Veteran-Owned', s: 'A registered SDVOSB. Verified through SAM.gov and the SBA Vetcert program. The CEO is a 22-year U.S. Army veteran (logistics).' },
  { t: 'Operates like a unit', s: 'Standard operating procedures, daily after-action notes, and a chain of command that lets the right person make the right call without a meeting.' },
  { t: 'Built to support fellow vets', s: 'Veterans get hiring preference. We sponsor the Atlanta-area DAV chapter and donate $1 of every Medava PPE order to veteran healthcare causes.' },
];

export function VeteranOwned() {
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  useSEO({
    title: 'Veteran-owned · SDVOSB · MSPV BPA holder',
    description:
      'Service-Disabled Veteran-Owned Small Business. SAM.gov verified. MSPV BPA 36C24123A0077. CAGE 8MK70. Founded by a 22-year U.S. Army logistics officer.',
    canonical: '/about/veteran-owned',
  });
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <main id="main">
        <PageHead
          eyebrow="ABOUT · VETERAN-OWNED"
          title={<>Veteran-owned. <br /><Grad>Veteran-run.</Grad></>}
          sub="Founded by a soldier. Built by a team that includes 14 other veterans across operations, sales, and ownership."
        />
        <section style={{ padding: `24px ${padX}px ${isMobile ? 56 : 64}px` }}>
          <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 24 : 56, alignItems: 'start' }}>
            <PhotoPlaceholder src={IMG.VET_FOUNDER} caption="Damon Reed, Lithia Springs warehouse" height={isMobile ? 280 : 520} stripeFrom="#e8ddcd" stripeTo="#d9c8b0" textColor={D.plum} />
            <div>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>FOUNDER · DAMON REED</div>
              <h2 style={{ fontFamily: D.display, fontSize: 'clamp(30px, 5.4vw, 48px)', fontWeight: 400, letterSpacing: -1, lineHeight: 1.08, margin: '14px 0 18px' }}>22 years moving supplies. Now I do it for medicine.</h2>
              <p style={{ fontSize: 16, color: D.ink2, lineHeight: 1.65, margin: 0 }}>I joined the Army at 18 and spent two decades getting things from where they were to where they needed to be — usually under conditions that wouldn&apos;t survive a board meeting. When I got out in 2017, the worst-run supply chain I encountered was American healthcare. So I built Unite.</p>
              <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {[['VOSB', 'SAM verified'], ['MSPV BPA', '36C24123A0077'], ['CAGE', '8MK70']].map(([b, s]) => (
                  <div key={b} style={{ borderTop: `2px solid ${D.plum}`, paddingTop: 12 }}>
                    <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{b}</div>
                    <div style={{ fontFamily: D.display, fontSize: 18, marginTop: 6 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: D.paperAlt, padding: `${isMobile ? 56 : 96}px ${padX}px`, borderTop: `1px solid ${D.line}`, borderBottom: `1px solid ${D.line}` }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 14 }}>WHAT IT MEANS HERE</div>
            <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 5.6vw, 56px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.02, margin: 0 }}>Three pillars. <Grad>No theatre.</Grad></h2>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
              {PILLARS.map((p) => (
                <div key={p.t} style={{ background: D.card, border: `1px solid ${D.line}`, borderRadius: 14, padding: 28 }}>
                  <div style={{ fontFamily: D.display, fontSize: 24, letterSpacing: -0.4, color: D.ink }}>{p.t}</div>
                  <p style={{ fontSize: 14.5, color: D.ink2, marginTop: 12, lineHeight: 1.6, marginBottom: 0 }}>{p.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: `${isMobile ? 56 : 96}px ${padX}px`, background: D.plum, color: D.paper }}>
          <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 22 : 56, alignItems: 'center' }}>
            <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 5.6vw, 56px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.02, margin: 0 }}>
              Need a capability statement?
            </h2>
            <div>
              <p style={{ fontSize: 16, color: D.plumSoft, lineHeight: 1.6, margin: 0 }}>
                Government buyers can pull our SDVOSB capability statement, MSPV BPA confirmation, and CAGE record from the document library at any time.
              </p>
              <button onClick={() => navigate('/compliance#docs')} style={{ marginTop: 20, background: D.paper, color: D.plum, border: 'none', padding: '13px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                Open the doc library <Icon.arrow />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
