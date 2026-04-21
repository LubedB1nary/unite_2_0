import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';
import { AdminCard, Sparkline } from '../../components/layout/AdminCard.jsx';
import { Icon } from '../../components/shared/Icon.jsx';
import { PRODUCTS } from '../../data/index.js';

export function AdminOverview() {
  return (
    <AdminShell active="overview">
      <div style={{ padding: '40px 40px 64px' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>OPERATIONS · OVERVIEW</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 28 }}>
          <h1 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.3, lineHeight: 1, margin: 0 }}>Operations overview.</h1>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3 }}>LAST SYNC · 04 MIN AGO</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
          {[
            ['$1.42M', 'Revenue MTD', '+12.4% MoM'],
            ['842', 'Orders MTD', '+8.1%'],
            ['12,400', 'SKUs live', '42 new this week'],
            ['98.6%', 'Fill rate', '48-hr median'],
          ].map(([b, s, sub], i) => (
            <div key={i} style={{ padding: 22, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{s.toUpperCase()}</div>
              <div style={{ fontFamily: D.display, fontSize: 40, color: D.ink, letterSpacing: -0.8, marginTop: 8 }}>{b}</div>
              <div style={{ fontSize: 12, color: '#3b8760', marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
          <AdminCard title="Revenue · trailing 30 days">
            <Sparkline points={[42,48,51,47,53,58,62,59,64,68,72,69,75,78,74,80,85,82,88,92,89,94,97,93,99,102,98,105,110,114]} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', marginTop: 20, gap: 18 }}>
              {[['ASCs', '$612K', '44%'], ['Pharmacy', '$298K', '21%'], ['Gov/VA', '$342K', '24%'], ['Dealers', '$168K', '11%']].map(([n, v, p], i) => (
                <div key={i}>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{n.toUpperCase()}</div>
                  <div style={{ fontFamily: D.display, fontSize: 22, color: D.ink, marginTop: 4 }}>{v}</div>
                  <div style={{ fontSize: 11, color: D.plum, fontFamily: D.mono }}>{p} share</div>
                </div>
              ))}
            </div>
          </AdminCard>
          <AdminCard title="Alerts">
            {[
              ['Low stock', 'Nitrile Gloves · Chemo · 4 days remaining', D.terra],
              ['Shipment delayed', 'Flexport FLX-8231 · customs hold', D.terra],
              ['Invoice overdue', 'Eastside Surgical · $4,812 · 11 days', D.terra],
              ['Quote pending', 'Shanghai MedTech Q-26-00284', D.plum],
              ['New lead', 'Piedmont Health System · hot', '#3b8760'],
            ].map(([h, s, c], i) => (
              <div key={i} style={{ padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, display: 'flex', gap: 12, alignItems: 'start' }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: c, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{h}</div>
                  <div style={{ fontSize: 12, color: D.ink2, marginTop: 2 }}>{s}</div>
                </div>
              </div>
            ))}
          </AdminCard>
        </div>
        <div style={{ marginTop: 14 }}>
          <AdminCard title="Recent orders">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>
                  {['ORDER', 'CUSTOMER', 'SEGMENT', 'ITEMS', 'TOTAL', 'PAYMENT', 'STATUS'].map((h) => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: `1px solid ${D.line}` }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['#04821', 'Atlanta Surgical', 'ASC', '14', '$4,125', 'Net 30', 'Processing', D.plum],
                  ['#04820', 'Walgreens #2184', 'Pharmacy', '8', '$1,892', 'Paid', 'Shipped', '#3b8760'],
                  ['#04819', 'VA Medical Center · Dublin', 'Gov', '42', '$28,410', 'PO', 'Processing', D.plum],
                  ['#04818', 'MedOne Distributors', 'Dealer', '120', '$14,820', 'Net 60', 'In transit', D.plum],
                  ['#04817', 'Buckhead ASC', 'ASC', '6', '$612', 'Net 30', 'Delivered', '#3b8760'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${D.line}` }}>
                    <td style={{ padding: '12px', fontFamily: D.mono, fontSize: 12 }}>{r[0]}</td>
                    <td style={{ padding: '12px', fontWeight: 500 }}>{r[1]}</td>
                    <td style={{ padding: '12px', color: D.ink2 }}>{r[2]}</td>
                    <td style={{ padding: '12px' }}>{r[3]}</td>
                    <td style={{ padding: '12px', fontFamily: D.display, fontSize: 15, color: D.plum }}>{r[4]}</td>
                    <td style={{ padding: '12px', color: D.ink2 }}>{r[5]}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: r[7] }}><Icon.dot /> {r[6]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}
