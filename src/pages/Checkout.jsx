import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';

function Section({ title, children }) {
  return (
    <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${D.line}`, fontFamily: D.display, fontSize: 18 }}>{title}</div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

export function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const steps = ['Address', 'Shipping', 'Payment', 'Review'];
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <div style={{ padding: '52px 40px 24px' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.2, color: D.plum }}>CHECKOUT · ORDER #UM-2026-04821</div>
          <h1 style={{ fontFamily: D.display, fontSize: 64, fontWeight: 400, letterSpacing: -1.5, margin: '10px 0 20px', lineHeight: 1 }}>
            Almost <em>there</em>.
          </h1>
          <div style={{ display: 'flex', gap: 4 }}>
            {steps.map((s, i) => (
              <div key={s} onClick={() => setStep(i + 1)} style={{ flex: 1, cursor: 'pointer' }}>
                <div style={{ height: 3, background: i < step ? D.plum : D.line, borderRadius: 2 }} />
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, marginTop: 10, color: i < step ? D.plum : D.ink3 }}>{String(i + 1).padStart(2, '0')} · {s.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '32px 40px 80px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 36 }}>
        <div style={{ display: 'grid', gap: 20 }}>
          <Section title="01 · Shipping address">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Atlanta Surgical Center · Main', '3320 Piedmont Rd NE, Atlanta GA 30305', true], ['Buckhead Surgery · Dock B', '4470 Lenox Ave, Atlanta GA 30326', false], ['Marietta ASC', '1020 Windy Hill Rd, Marietta GA 30080', false], ['+ Add new address', '', false]].map(([name, addr, active], i) => (
                <div key={i} style={{ padding: 16, borderRadius: 12, border: `1.5px solid ${active ? D.plum : D.line}`, background: active ? D.paperAlt : D.card, cursor: 'pointer', display: 'flex', alignItems: 'start', gap: 10 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 8, border: `1.5px solid ${active ? D.plum : D.ink3}`, marginTop: 3, background: active ? D.plum : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: D.paper, fontSize: 10 }}>{active ? '✓' : ''}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                    {addr && <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{addr}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="02 · Shipping method">
            {[['Standard ground', '3-5 business days', 'Free', true], ['Expedited', 'Next business day', '$38', false], ['Same-day (Atlanta metro)', 'By 6pm today', '$95', false]].map(([n, d, p, a], i) => (
              <div key={i} style={{ padding: 16, borderBottom: i === 2 ? 'none' : `1px solid ${D.line}`, display: 'grid', gridTemplateColumns: '20px 1fr auto', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, border: `1.5px solid ${a ? D.plum : D.ink3}`, background: a ? D.plum : 'transparent' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{n}</div>
                  <div style={{ fontSize: 12, color: D.ink2, marginTop: 2 }}>{d}</div>
                </div>
                <div style={{ fontFamily: D.display, fontSize: 18, color: D.plum }}>{p}</div>
              </div>
            ))}
          </Section>
          <Section title="03 · Payment">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {[['Net 30', 'on file'], ['ACH', 'primary'], ['Wire transfer', ''], ['Credit card', '**4412']].map(([n, s], i) => (
                <div key={i} style={{ padding: 16, borderRadius: 12, border: `1.5px solid ${i === 0 ? D.plum : D.line}`, background: i === 0 ? D.paperAlt : D.card, cursor: 'pointer' }}>
                  <div style={{ fontFamily: D.display, fontSize: 18, letterSpacing: -0.3 }}>{n}</div>
                  <div style={{ fontSize: 11, color: D.ink3, fontFamily: D.mono, marginTop: 4, letterSpacing: 0.8 }}>{s.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: D.paperAlt, fontSize: 13, color: D.ink2 }}>
              PO # (optional) — <input placeholder="Enter customer PO" style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: D.sans, fontSize: 13, color: D.ink }} />
            </div>
          </Section>
        </div>
        <div>
          <div style={{ position: 'sticky', top: 120, background: D.plum, color: D.paper, borderRadius: 16, padding: 28 }}>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plumSoft }}>ORDER · 3 ITEMS</div>
            <div style={{ marginTop: 18, display: 'grid', gap: 12, fontSize: 13 }}>
              {[['Knee Brace · L-1832', '× 12', '$985.20'], ['Nitrile Gloves · Chemo', '× 40', '$420.00'], ['3-in-1 Test · Covid/Flu/RSV', '× 20', '$2,720.00']].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12 }}>
                  <span style={{ color: D.plumSoft }}>{r[0]}</span>
                  <span style={{ color: D.plumSoft }}>{r[1]}</span>
                  <span>{r[2]}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,.18)', margin: '20px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div style={{ fontFamily: D.mono, fontSize: 11, color: D.plumSoft }}>TOTAL</div>
              <div style={{ fontFamily: D.display, fontSize: 40, letterSpacing: -1 }}>$4,125.20</div>
            </div>
            <button onClick={() => navigate('/orders/284712/confirmed')} style={{ marginTop: 20, width: '100%', background: D.paper, color: D.plum, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Place order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
