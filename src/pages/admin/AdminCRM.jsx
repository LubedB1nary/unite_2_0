import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';
import { AdminCard } from '../../components/layout/AdminCard.jsx';

export function AdminCRM() {
  return (
    <AdminShell active="crm">
      <div style={{ padding: '40px 40px 64px' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>SALES · CRM & PIPELINE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 28 }}>
          <h1 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.3, lineHeight: 1, margin: 0 }}>CRM · pipeline.</h1>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.ink3 }}>LAST SYNC · 04 MIN AGO</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 14 }}>
          {[['142', 'Active leads', '32 hot'], ['$2.8M', 'Pipeline value', 'open deals'], ['68', 'Organizations', '+4 this week'], ['11 min', 'Avg rep reply', 'across 18 reps']].map(([b, s, sub], i) => (
            <div key={i} style={{ padding: 22, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{s.toUpperCase()}</div>
              <div style={{ fontFamily: D.display, fontSize: 36, color: D.ink, letterSpacing: -0.6, marginTop: 8 }}>{b}</div>
              <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
          <AdminCard title="Pipeline · Kanban">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {[
                ['Cold', 42, [['MedSource Atlanta', '$22K'], ['Pinnacle ASC', '$8K'], ['Southeast Pharmacy', '$14K']]],
                ['Warm', 38, [['Piedmont Health', '$184K'], ['Emory ASC', '$92K'], ['CVS #2184', '$38K']]],
                ['Qualified', 30, [['Northside Hospital', '$412K'], ['VA · Dublin', '$288K']]],
                ['Hot', 32, [['Atlanta Surgical', '$512K'], ['MedOne Dealers', '$240K']]],
              ].map(([stage, count, deals], i) => (
                <div key={i} style={{ background: D.paperAlt, borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{stage.toUpperCase()}</div>
                    <div style={{ fontSize: 11, color: D.ink3, fontFamily: D.mono }}>{count}</div>
                  </div>
                  {deals.map(([n, v], j) => (
                    <div key={j} style={{ padding: 10, background: D.card, borderRadius: 8, marginBottom: 6, border: `1px solid ${D.line}` }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{n}</div>
                      <div style={{ fontFamily: D.display, fontSize: 16, color: D.plum, marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </AdminCard>
          <AdminCard title="Today's activity">
            {[
              ['Fathom · call recap', 'Piedmont Health · 32m · 4 action items', '2m ago', D.plum],
              ['Meeting booked', 'VA Dublin · procurement review', '18m ago', '#3b8760'],
              ['Email sent', 'MedOne · net 60 terms quote', '1h', D.ink3],
              ['Note', 'Atlanta Surgical · Sarah mentioned shoulder tray', '2h', D.ink3],
              ['Call · Meredith', 'Buckhead ASC · 18m', '3h', D.plum],
              ['Lead converted', 'Walgreens regional → qualified', '5h', '#3b8760'],
            ].map(([h, s, t, c], i) => (
              <div key={i} style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, display: 'flex', gap: 12, alignItems: 'start' }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: c, marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{h}</div>
                  <div style={{ fontSize: 12, color: D.ink2, marginTop: 2 }}>{s}</div>
                </div>
                <div style={{ fontSize: 11, color: D.ink3, fontFamily: D.mono }}>{t}</div>
              </div>
            ))}
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}
