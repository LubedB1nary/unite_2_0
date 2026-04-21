import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Grad } from '../components/shared/Grad.jsx';

export function About() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ padding: '80px 40px 32px', background: D.paper }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 24 }}>EST. 2018 · LITHIA SPRINGS, GA</div>
            <h1 style={{ fontFamily: D.display, fontSize: 108, fontWeight: 400, lineHeight: 0.94, letterSpacing: -2.8, margin: 0 }}>
              Built by a soldier.<br />Run <Grad>like one</Grad>.
            </h1>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.6, color: D.ink2, maxWidth: 460 }}>
            Damon Reed spent 22 years in the U.S. Army moving supplies where they needed to be, on time, no excuses. Unite Medical is what happens when that discipline meets American healthcare procurement.
          </div>
        </div>
      </div>
      <div style={{ padding: '40px 40px 96px' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <PhotoPlaceholder caption="Damon Reed on the warehouse floor" height={520} stripeFrom="#e8ddcd" stripeTo="#d9c8b0" textColor={D.plum} />
        </div>
      </div>
      <div style={{ background: D.paperAlt, padding: '96px 40px', borderTop: `1px solid ${D.line}`, borderBottom: `1px solid ${D.line}` }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80 }}>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 20 }}>THE FOUNDER</div>
            <h2 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.2, lineHeight: 1, margin: 0 }}>A letter from <em>Damon</em>.</h2>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: D.ink2 }}>
            <p style={{ marginTop: 0 }}>When I started Unite, I'd watched too many small clinics get stiff-armed by the Big 3 — minimum orders they couldn't meet, reps they couldn't reach, landed costs hidden behind five layers of markup. That's not how supply works in the field. You get people what they need, when they need it, and you don't charge them for the privilege of asking.</p>
            <p style={{ marginTop: 20 }}>Over five years we've moved 500 million items. Not because we're the biggest — we're not — but because we picked up the phone, drove through the night when we had to, and built the operating system the Big 3 never bothered to build.</p>
            <p style={{ marginTop: 20 }}>This platform is that system. Every order, every quote, every reorder runs through one pane of glass. No double entry. No "let me check with accounting." That's the product.</p>
            <p style={{ fontFamily: D.display, fontSize: 22, fontStyle: 'italic', color: D.ink, marginTop: 32 }}>— Damon Reed, Founder & CEO</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '96px 40px', background: D.paper }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 20 }}>CREDENTIALS</div>
          <h2 style={{ fontFamily: D.display, fontSize: 64, fontWeight: 400, letterSpacing: -1.5, margin: 0, lineHeight: 1 }}>The paperwork,<br /> kept clean.</h2>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            {[['FDA Registered', '3015727296', 'Device distribution'], ['MSPV BPA', '36C24123A0077', 'VA contract'], ['CAGE Code', '8MK70', 'Federal contracting'], ['DUNS', '117553945', 'SAM registered'], ['VOSB', 'Verified', 'Veteran-owned'], ['TAA Compliant', 'Documented', 'Country of origin'], ['Berry Compliant', 'Medava PPE', 'Buy America Act'], ['PDAC Approved', '48 SKUs', 'Medicare billing']].map(([label, val, sub], i) => (
              <div key={i} style={{ borderTop: `2px solid ${D.plum}`, padding: '18px 0' }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{label.toUpperCase()}</div>
                <div style={{ fontFamily: D.display, fontSize: 26, letterSpacing: -0.4, color: D.ink, marginTop: 8 }}>{val}</div>
                <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
