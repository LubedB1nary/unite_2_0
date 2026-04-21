import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Grad } from '../components/shared/Grad.jsx';

export function BlogPost() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 40px 40px' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>MARKET · APRIL 12, 2026 · 8 MIN READ</div>
        <h1 style={{ fontFamily: D.display, fontSize: 64, fontWeight: 400, letterSpacing: -1.5, lineHeight: 1, margin: '20px 0 24px' }}>
          What McKesson's Med-Surg spin-off means <Grad>for regional ASCs</Grad>.
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 24, borderBottom: `1px solid ${D.line}` }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: D.plum }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Damon Reed · Founder</div>
            <div style={{ fontSize: 12, color: D.ink2 }}>22-yr Army logistics officer · runs Unite from Lithia Springs</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: '0 auto 40px', padding: '0 40px' }}>
        <PhotoPlaceholder caption="Med-Surg spin-off · graphic" height={420} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} />
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px 80px', fontSize: 18, lineHeight: 1.7, color: D.ink }}>
        <p style={{ fontFamily: D.display, fontSize: 24, fontStyle: 'italic', color: D.ink2, borderLeft: `3px solid ${D.plum}`, paddingLeft: 22, margin: '0 0 36px' }}>
          In May 2025 McKesson announced intent to separate its Medical-Surgical Solutions business. That opens a 12-24 month window where roughly $11B in customer relationships are reviewed, renegotiated, and — for the prepared distributor — re-won.
        </p>
        <p>For an ASC materials manager, the spin-off reads as uncertainty. Contract terms may move. Sales reps may leave. Fill rates may slip during the transition. That's exactly when a second supplier gets added to the PO rotation.</p>
        <h2 style={{ fontFamily: D.display, fontSize: 32, letterSpacing: -0.6, margin: '40px 0 16px' }}>Who moves first, and why</h2>
        <p>Smaller surgery centers — the ones that never loved the MOQ floors in the first place — are the earliest movers. The calculation is straightforward: lose the volume discount on 18 SKUs, gain flexibility on 340.</p>
        <p>Regional distributors operating with thin margins and older WMS stacks are the second movers. They're looking for a drop-ship partner who carries the FDA-registered import risk.</p>
        <h2 style={{ fontFamily: D.display, fontSize: 32, letterSpacing: -0.6, margin: '40px 0 16px' }}>What we're doing</h2>
        <p>We've built a target list. Every McKesson Med-Surg account within 400 miles of Atlanta, Reno, or Dallas. Our reps are running the outbound cycle with one question: <em>"what's the smallest order you haven't been able to place this quarter?"</em> That's the open.</p>
      </div>
      <Footer />
    </div>
  );
}
