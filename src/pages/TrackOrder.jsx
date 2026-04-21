import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';

const steps = [
  ['Placed', 'Apr 21 · 2:18 PM', 'Order landed in WMS', true],
  ['Picked', 'Apr 21 · 4:02 PM', 'Atlanta DC · bay 4B', true],
  ['Packed', 'Apr 21 · 5:41 PM', '3 cartons · 84 lbs', true],
  ['Shipped', 'Apr 22 · 7:15 AM', 'FedEx Ground · 792047581234', true],
  ['In transit', 'Apr 22 · 11:40 AM', 'Doraville, GA facility', false, true],
  ['Out for delivery', 'Apr 23 · est. 9:00 AM', '', false],
  ['Delivered', 'Apr 23 · est. 2:00 PM', '', false],
];

export function TrackOrder() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="ORDER #UM-284712 · SUNRISE ASC" title={<>In <Grad>transit</Grad>.</>}
        sub="Live from FedEx tracking + our Atlanta DC. Refreshes every 60 seconds."
        right={
          <div style={{ padding: 24, background: D.card, border: `1px solid ${D.line}`, borderRadius: 16 }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>TRACKING · FEDEX GROUND</div>
            <div style={{ fontFamily: D.display, fontSize: 32, letterSpacing: -0.6, marginTop: 8 }}>7920 4758 1234</div>
            <div style={{ fontSize: 13, color: D.ink2, marginTop: 6 }}>Delivered by Thu, Apr 23 · 2:00 PM</div>
          </div>
        }
      />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 40px 64px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
        <div>
          <div style={{ height: 280, borderRadius: 16, border: `1px solid ${D.line}`, background: D.paperAlt, position: 'relative', overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent 0 18px, rgba(94,41,99,0.04) 18px 19px)' }} />
            <svg viewBox="0 0 400 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
              <path d="M 60 70 Q 180 20 320 40" fill="none" stroke={D.plum} strokeWidth="0.8" strokeDasharray="3,3" />
              <circle cx="60" cy="70" r="2.5" fill={D.plum} /><circle cx="320" cy="40" r="2.5" fill={D.plum} />
              <circle cx="180" cy="46" r="4" fill={D.terra} />
            </svg>
            <div style={{ position: 'absolute', bottom: 18, left: 24, fontFamily: D.mono, fontSize: 11, letterSpacing: 0.8, color: D.plum }}>ATLANTA DC → DORAVILLE, GA → ATLANTA, GA 30328</div>
          </div>
          <div style={{ background: D.card, borderRadius: 16, border: `1px solid ${D.line}`, padding: 32 }}>
            <div style={{ fontFamily: D.display, fontSize: 30, letterSpacing: -0.5, marginBottom: 20 }}>Timeline</div>
            {steps.map(([name, time, sub, done, now], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 160px', gap: 14, padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, alignItems: 'start' }}>
                <div>
                  <div style={{ width: 16, height: 16, borderRadius: 8, background: done ? D.plum : now ? D.terra : D.line, marginTop: 2, boxShadow: now ? '0 0 0 6px rgba(184,80,44,.18)' : 'none' }} />
                </div>
                <div>
                  <div style={{ fontFamily: D.display, fontSize: 18, letterSpacing: -0.2, color: done || now ? D.ink : D.ink3 }}>{name}</div>
                  {sub && <div style={{ fontSize: 13, color: D.ink2, marginTop: 4 }}>{sub}</div>}
                </div>
                <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 0.6, color: D.ink3, textAlign: 'right' }}>{time.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div style={{ padding: 24, background: D.card, borderRadius: 16, border: `1px solid ${D.line}` }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>SHIPMENT 1 OF 1</div>
            <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, marginTop: 8 }}>3 cartons · 84 lbs</div>
            <div style={{ fontSize: 13, color: D.ink2, marginTop: 6 }}>All 7 lines shipped together</div>
          </div>
          <div style={{ padding: 24, background: D.card, borderRadius: 16, border: `1px solid ${D.line}` }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>DELIVERY INSTRUCTIONS</div>
            <div style={{ fontSize: 13, color: D.ink2, marginTop: 10, lineHeight: 1.5 }}>Deliver to receiving dock B. Ring buzzer twice. Jessica Garcia will sign.</div>
          </div>
          <button style={{ background: D.plum, color: D.paper, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Contact rep about this order</button>
          <button style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: 13, borderRadius: 999, fontSize: 14, cursor: 'pointer' }}>Download packing slip</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
