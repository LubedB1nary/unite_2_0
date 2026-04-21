import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { Grad } from '../components/shared/Grad.jsx';

export function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: D.plum, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.check style={{ color: D.paper, width: 28, height: 28 }} />
          </div>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>ORDER #UM-284712 · PLACED APR 21, 2026 · 2:18 PM ET</div>
            <h1 style={{ fontFamily: D.display, fontSize: 68, fontWeight: 400, letterSpacing: -1.5, lineHeight: 1, margin: '10px 0 0' }}>
              Order confirmed, <Grad>Jessica</Grad>.
            </h1>
          </div>
        </div>
        <div style={{ fontSize: 17, color: D.ink2, marginTop: 22, maxWidth: 720, lineHeight: 1.55 }}>Your order is locked in. We're picking at the Atlanta DC — tracking will populate within 2 hours. Net-30 clock starts on ship date.</div>
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          <div style={{ background: D.card, borderRadius: 16, border: `1px solid ${D.line}`, padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
              <div style={{ fontFamily: D.display, fontSize: 28, letterSpacing: -0.4 }}>In this order</div>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3 }}>7 LINES · 284 UNITS</div>
            </div>
            {[['L1832 · Knee Orthosis, Adjustable', 12, 92.40], ['A4927 · Non-sterile gloves, 100ct', 40, 14.80], ['Walking boot, pneumatic, Lg', 8, 48.50], ['Hydrocolloid dressing, 4x4', 60, 6.20], ['Surgical mask, Level 3 (50ct)', 24, 11.80], ['Antimicrobial wipes, canister', 36, 9.40], ['Exam table paper, 21" white', 104, 4.15]].map(([name, qty, price], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px', gap: 16, padding: '14px 0', borderTop: `1px solid ${D.line}`, fontSize: 14 }}>
                <div style={{ color: D.ink }}>{name}</div>
                <div style={{ fontFamily: D.mono, color: D.ink2, textAlign: 'right' }}>× {qty}</div>
                <div style={{ fontFamily: D.mono, color: D.ink, textAlign: 'right' }}>${(qty * price).toFixed(2)}</div>
              </div>
            ))}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `2px solid ${D.plum}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3 }}>Total · Net-30</div>
              <div style={{ fontFamily: D.display, fontSize: 44, color: D.plum, letterSpacing: -0.9 }}>$4,284.50</div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ padding: 24, background: D.plum, color: D.paper, borderRadius: 16 }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft }}>ESTIMATED DELIVERY</div>
              <div style={{ fontFamily: D.display, fontSize: 44, letterSpacing: -0.9, marginTop: 8, lineHeight: 1 }}>Thu, Apr 23</div>
              <div style={{ fontSize: 13, color: D.plumSoft, marginTop: 8 }}>Ships from Atlanta DC · FedEx Ground</div>
              <button onClick={() => navigate('/orders/284712/track')} style={{ marginTop: 18, width: '100%', background: D.paper, color: D.plum, border: 'none', padding: 12, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Track order</button>
            </div>
            <div style={{ padding: 24, background: D.card, borderRadius: 16, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>SHIP TO</div>
              <div style={{ fontFamily: D.display, fontSize: 18, marginTop: 8, letterSpacing: -0.2 }}>Sunrise ASC · Receiving</div>
              <div style={{ fontSize: 13, color: D.ink2, marginTop: 4, lineHeight: 1.5 }}>420 Johnson Ferry Rd NE<br />Atlanta, GA 30328</div>
              <div style={{ marginTop: 14, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>PO · SUN-2026-0412</div>
            </div>
            <div style={{ padding: 24, background: D.card, borderRadius: 16, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>YOUR REP</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: D.plum }} />
                <div>
                  <div style={{ fontFamily: D.display, fontSize: 18, letterSpacing: -0.2 }}>Miguel Vasquez</div>
                  <div style={{ fontSize: 12, color: D.ink2 }}>(678) 555-0180 · miguel@unitemedical.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
