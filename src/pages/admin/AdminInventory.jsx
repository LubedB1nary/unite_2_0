import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';
import { AdminCard, Sparkline } from '../../components/layout/AdminCard.jsx';
import { Icon } from '../../components/shared/Icon.jsx';
import { PRODUCTS } from '../../data/index.js';

export function AdminInventory() {
  return (
    <AdminShell active="inventory">
      <div style={{ padding: '40px 40px 64px' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>OPS · INVENTORY</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 28 }}>
          <h1 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.3, lineHeight: 1, margin: 0 }}>Inventory.</h1>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3 }}>LAST SYNC · 04 MIN AGO</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 14 }}>
          {[['12,400', 'Total SKUs', '42 new'], ['$4.12M', 'Inventory value', 'landed cost'], ['18', 'Low stock', 'needs reorder'], ['4', 'Out of stock', 'critical']].map(([b, s, sub], i) => (
            <div key={i} style={{ padding: 22, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{s.toUpperCase()}</div>
              <div style={{ fontFamily: D.display, fontSize: 36, color: D.ink, letterSpacing: -0.6, marginTop: 8 }}>{b}</div>
              <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 14 }}>
          <AdminCard title="Movement · 30 days">
            <Sparkline points={[40,48,42,55,58,52,62,68,61,70,72,65,78,82,76,88,85,80,92,96,88,95,102,98,105,110,104,115,120,118]} dual />
            <div style={{ display: 'flex', gap: 20, marginTop: 18, fontSize: 12, color: D.ink2 }}>
              <span><Icon.dot style={{ color: D.plum }} /> Inbound</span>
              <span><Icon.dot style={{ color: D.terra }} /> Outbound</span>
            </div>
          </AdminCard>
          <AdminCard title="Warehouse utilization">
            {[['Atlanta, GA · main', '74%'], ['Reno, NV', '52%'], ['Dallas, TX', '61%'], ['Lithia Springs · overflow', '88%']].map(([n, p], i) => (
              <div key={i} style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span>{n}</span>
                  <span style={{ fontFamily: D.display, color: D.plum }}>{p}</span>
                </div>
                <div style={{ height: 6, background: D.paperAlt, borderRadius: 3, marginTop: 6 }}>
                  <div style={{ height: 6, background: D.plum, borderRadius: 3, width: p }} />
                </div>
              </div>
            ))}
          </AdminCard>
        </div>
        <AdminCard title="Inventory table">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>
                {['SKU', 'PRODUCT', 'CATEGORY', 'WAREHOUSE', 'ON HAND', 'REORDER AT', 'STATUS', 'ACTIONS'].map((h) => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: `1px solid ${D.line}` }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => {
                const [label, color] = p.stock < 300 ? ['Low', D.terra] : p.stock < 100 ? ['Critical', '#b24928'] : ['In stock', '#3b8760'];
                return (
                  <tr key={p.sku} style={{ borderTop: i === 0 ? 'none' : `1px solid ${D.line}` }}>
                    <td style={{ padding: '12px', fontFamily: D.mono, fontSize: 12 }}>{p.sku}</td>
                    <td style={{ padding: '12px', fontWeight: 500 }}>{p.name.split('·')[0].trim()}</td>
                    <td style={{ padding: '12px', color: D.ink2 }}>{p.cat}</td>
                    <td style={{ padding: '12px', color: D.ink2 }}>Atlanta</td>
                    <td style={{ padding: '12px', fontFamily: D.mono }}>{p.stock.toLocaleString()}</td>
                    <td style={{ padding: '12px', fontFamily: D.mono, color: D.ink3 }}>{Math.floor(p.stock * 0.2)}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color }}><Icon.dot /> {label}</span>
                    </td>
                    <td style={{ padding: '12px', fontFamily: D.mono, fontSize: 11, color: D.plum }}>REORDER · EDIT</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
