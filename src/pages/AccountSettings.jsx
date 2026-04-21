import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';

const addresses = [
  { label: 'RECEIVING · DEFAULT', name: 'Sunrise ASC · Receiving', addr: '420 Johnson Ferry Rd NE\nAtlanta, GA 30328', primary: true },
  { label: 'BILLING', name: 'Sunrise ASC · AP', addr: '420 Johnson Ferry Rd NE\nAtlanta, GA 30328' },
  { label: 'CLINIC · BUCKHEAD', name: 'Sunrise Buckhead', addr: '3379 Peachtree Rd NE, Ste 400\nAtlanta, GA 30326' },
  { label: 'CLINIC · MARIETTA', name: 'Sunrise Marietta', addr: '1580 Church St Ext\nMarietta, GA 30060' },
];

const team = [
  ['Jessica Garcia', 'Materials Manager', 'jessica@sunrise-asc.com', 'Admin'],
  ['Dr. Aaron Patel', 'Medical Director', 'a.patel@sunrise-asc.com', 'Approver'],
  ['Latoya Brooks', 'Accounts Payable', 'l.brooks@sunrise-asc.com', 'Billing only'],
  ['Front Desk · Buckhead', '—', 'buckhead@sunrise-asc.com', 'Reorder only'],
];

export function AccountSettings() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="ACCOUNT · SUNRISE ASC" title="Settings" sub="Organization profile, team access, billing terms, and integrations — all in one pane." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 40px 64px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
        <div>
          {['Profile', 'Team & access', 'Billing & terms', 'Integrations', 'Notifications', 'API keys', 'Audit log'].map((s, i) => (
            <div key={s} style={{ padding: '11px 14px', borderRadius: 8, fontSize: 13, background: i === 0 ? D.plum : 'transparent', color: i === 0 ? D.paper : D.ink2, fontWeight: i === 0 ? 600 : 500, cursor: 'pointer', marginBottom: 2 }}>{s}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 18 }}>
          <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontFamily: D.display, fontSize: 24, letterSpacing: -0.4 }}>Organization profile</div>
              <button style={{ background: 'transparent', color: D.plum, border: `1px solid ${D.plum}`, padding: '8px 16px', borderRadius: 999, fontSize: 12, cursor: 'pointer' }}>Edit</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[['Legal name', 'Sunrise Ambulatory Surgery Center LLC'], ['EIN', '58-2194827'], ['Segment', 'Ambulatory Surgery Center'], ['State', 'Georgia · tax-exempt'], ['Annual spend', '$1.8M'], ['Customer since', 'March 2021']].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize: 14, color: D.ink, marginTop: 6 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ fontFamily: D.display, fontSize: 24, letterSpacing: -0.4 }}>Saved addresses</div>
              <button style={{ background: D.plum, color: D.paper, border: 'none', padding: '8px 16px', borderRadius: 999, fontSize: 12, cursor: 'pointer' }}>+ Add address</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {addresses.map((a, i) => (
                <div key={i} style={{ padding: 18, background: D.paper, borderRadius: 10, border: `${a.primary ? 2 : 1}px solid ${a.primary ? D.plum : D.line}` }}>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{a.label}</div>
                  <div style={{ fontFamily: D.display, fontSize: 18, letterSpacing: -0.2, marginTop: 8 }}>{a.name}</div>
                  <div style={{ fontSize: 13, color: D.ink2, marginTop: 4, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{a.addr}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, padding: 28 }}>
            <div style={{ fontFamily: D.display, fontSize: 24, letterSpacing: -0.4, marginBottom: 18 }}>Team</div>
            {team.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1.3fr 1.2fr 120px 80px', gap: 16, padding: '14px 0', borderTop: `1px solid ${D.line}`, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: D.plumSoft }} />
                <div>
                  <div style={{ fontSize: 14, color: D.ink }}>{r[0]}</div>
                  <div style={{ fontSize: 12, color: D.ink2 }}>{r[1]}</div>
                </div>
                <div style={{ fontSize: 13, color: D.ink2 }}>{r[2]}</div>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{r[3].toUpperCase()}</div>
                <div style={{ fontSize: 12, color: D.ink3, textAlign: 'right' }}>Manage</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
