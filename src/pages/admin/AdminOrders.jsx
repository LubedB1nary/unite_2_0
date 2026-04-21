import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';

const orders = [
  ['UM-284712', 'Sunrise ASC · Atlanta', 'Apr 21', '$4,284.50', 'Net-30', 'Picked', 'Atlanta DC'],
  ['UM-284711', 'Williams Pharmacy · Kennesaw', 'Apr 21', '$812.40', 'Card', 'Packed', 'Atlanta DC'],
  ['UM-284710', 'VA Atlanta · Medava PPE', 'Apr 21', '$22,480.00', 'MSPV', 'Shipped', 'Reno DC'],
  ['UM-284709', 'Cobb County EMS', 'Apr 21', '$1,940.20', 'Net-30', 'Shipped', 'Atlanta DC'],
  ['UM-284708', 'Lone Star DME · Dallas', 'Apr 20', '$6,120.00', 'Dealer', 'In transit', 'Dallas DC'],
  ['UM-284707', 'Piedmont Surgery Center', 'Apr 20', '$3,240.50', 'Net-30', 'Delivered', 'Atlanta DC'],
  ['UM-284706', 'Desert Orthopedic · Reno', 'Apr 20', '$9,880.00', 'Net-30', 'Delivered', 'Reno DC'],
  ['UM-284705', 'Northside Clinic · Buckhead', 'Apr 19', '$420.80', 'Card', 'Delivered', 'Atlanta DC'],
];

const statusColor = (s) => ({ Picked: D.terra, Packed: D.plum, Shipped: '#2d6a4f', 'In transit': '#2d6a4f', Delivered: D.ink3 }[s] || D.ink3);

export function AdminOrders() {
  return (
    <AdminShell active="orders">
      <div style={{ padding: '40px 40px 32px', borderBottom: `1px solid ${D.line}` }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>OPS · ORDERS & SHIPPING</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <h1 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.3, lineHeight: 1, margin: 0 }}>Orders today.</h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ background: 'transparent', color: D.ink, border: `1px solid ${D.line}`, padding: '10px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>Sync ShipStation</button>
            <button style={{ background: D.plum, color: D.paper, border: 'none', padding: '10px 18px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>+ New order</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginTop: 28 }}>
          {[['142', 'Orders today'], ['$68,420', 'Revenue today'], ['28', 'In WMS pick'], ['11', 'Pending ship'], ['98.6%', 'Fill rate · WTD']].map(([b, s], i) => (
            <div key={i} style={{ padding: 20, background: D.card, borderRadius: 12, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.display, fontSize: 28, color: D.plum, letterSpacing: -0.5 }}>{b}</div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginTop: 6 }}>{s.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 40px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {['All', 'Net-30', 'Card', 'MSPV', 'Dealer'].map((f, i) => (
              <button key={f} style={{ background: i === 0 ? D.plum : D.card, color: i === 0 ? D.paper : D.ink2, border: `1px solid ${i === 0 ? D.plum : D.line}`, padding: '6px 12px', borderRadius: 999, fontSize: 12, cursor: 'pointer' }}>{f}</button>
            ))}
          </div>
          <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: D.paperAlt, fontFamily: D.mono, fontSize: 9, letterSpacing: 1, color: D.ink3 }}>
                  {['ORDER', 'CUSTOMER', 'DATE', 'AMOUNT', 'TERMS', 'STATUS', 'DC'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {orders.map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${D.line}`, background: i === 0 ? 'rgba(94,41,99,.04)' : 'transparent' }}>
                    <td style={{ padding: '11px 14px', fontFamily: D.mono, color: D.plum, fontWeight: 600 }}>{r[0]}</td>
                    <td style={{ padding: '11px 14px' }}>{r[1]}</td>
                    <td style={{ padding: '11px 14px', color: D.ink2, fontFamily: D.mono }}>{r[2]}</td>
                    <td style={{ padding: '11px 14px', fontFamily: D.mono }}>{r[3]}</td>
                    <td style={{ padding: '11px 14px', color: D.ink2 }}>{r[4]}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, padding: '3px 8px', borderRadius: 999, background: `${statusColor(r[5])}20`, color: statusColor(r[5]) }}>{r[5].toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '11px 14px', fontSize: 11, color: D.ink2 }}>{r[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ marginTop: 24, background: D.card, borderRadius: 12, border: `2px solid ${D.plum}`, padding: 24 }}>
          <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>SELECTED · UM-284712</div>
          <div style={{ fontFamily: D.display, fontSize: 30, letterSpacing: -0.5, marginTop: 6, lineHeight: 1.1 }}>Sunrise ASC</div>
          <div style={{ fontSize: 12, color: D.ink2 }}>Jessica Garcia · Atlanta, GA · 4-yr customer</div>
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['$4,284.50', 'Total'], ['7 / 284', 'Lines / units'], ['Net-30', 'Terms · due May 21'], ['SUN-2026-0412', 'PO number']].map(([b, s], i) => (
              <div key={i} style={{ padding: 12, background: D.paper, borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontFamily: D.display, letterSpacing: -0.3 }}>{b}</div>
                <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, color: D.ink3, marginTop: 4 }}>{s.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginBottom: 8 }}>SHIPMENTS</div>
          <div style={{ padding: 14, background: D.paper, borderRadius: 8, border: `1px solid ${D.line}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Shipment 1 · Atlanta DC</div>
              <span style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, padding: '3px 8px', borderRadius: 999, background: '#2d6a4f20', color: '#2d6a4f' }}>SHIPPED</span>
            </div>
            <div style={{ fontSize: 12, color: D.ink2, marginTop: 6 }}>FedEx Ground · 792047581234 · 3 cartons · 84 lbs</div>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 0.8, color: D.plum, marginTop: 8 }}>EST. DELIVERY · THU APR 23, 2:00 PM</div>
          </div>
          <div style={{ marginTop: 18, fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginBottom: 8 }}>ACTIVITY</div>
          {[
            ['System', 'Label printed · ShipStation synced', 'Apr 21 · 5:44 PM'],
            ['Miguel V.', 'Marked packed · 3 cartons', 'Apr 21 · 5:41 PM'],
            ['System', 'Picked from bay 4B', 'Apr 21 · 4:02 PM'],
            ['Jessica G.', 'Order placed · web portal', 'Apr 21 · 2:18 PM'],
          ].map(([who, act, t], i) => (
            <div key={i} style={{ padding: '10px 0', borderTop: `1px solid ${D.line}`, display: 'grid', gridTemplateColumns: '80px 1fr 120px', gap: 10, fontSize: 12 }}>
              <div style={{ color: D.plum, fontWeight: 600 }}>{who}</div>
              <div style={{ color: D.ink2 }}>{act}</div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 0.6, color: D.ink3, textAlign: 'right' }}>{t.toUpperCase()}</div>
            </div>
          ))}
          <button style={{ marginTop: 14, width: '100%', background: D.plum, color: D.paper, border: 'none', padding: 11, borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Open full detail →</button>
        </div>
      </div>
    </AdminShell>
  );
}
