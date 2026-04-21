import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';

export function Contact() {
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="CONTACT · MON-FRI 7A-7P ET"
        title={<>Call us. <Grad>We answer.</Grad></>}
        sub="Every inbound routes to a human on first ring. No trees, no queues — just the rep assigned to your segment." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 40px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, padding: 32 }}>
          <div style={{ fontFamily: D.display, fontSize: 26, marginBottom: 18 }}>Send us a line</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['First name', 'Last name'].map((f) => (
              <label key={f} style={{ fontSize: 12, fontFamily: D.mono, letterSpacing: 0.6, color: D.ink3 }}>{f.toUpperCase()}
                <div style={{ marginTop: 6, padding: '12px 14px', background: D.paper, border: `1px solid ${D.line}`, borderRadius: 10, fontSize: 14, color: D.ink2 }}>—</div>
              </label>
            ))}
          </div>
          {['Organization', 'Work email', 'What can we help with?'].map((f, i) => (
            <label key={f} style={{ display: 'block', marginTop: 12, fontSize: 12, fontFamily: D.mono, letterSpacing: 0.6, color: D.ink3 }}>{f.toUpperCase()}
              <div style={{ marginTop: 6, padding: i === 2 ? '12px 14px 54px' : '12px 14px', background: D.paper, border: `1px solid ${D.line}`, borderRadius: 10, fontSize: 14, color: D.ink2 }}>{i === 2 ? '' : '—'}</div>
            </label>
          ))}
          <label style={{ display: 'block', marginTop: 14, fontSize: 12, color: D.ink2 }}>
            <input type="checkbox" defaultChecked style={{ accentColor: D.plum, marginRight: 8 }} /> Route this to a sales rep (recommended)
          </label>
          <button style={{ marginTop: 16, background: D.plum, color: D.paper, border: 'none', padding: '14px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send message</button>
        </div>
        <div>
          <div style={{ fontFamily: D.display, fontSize: 36, lineHeight: 1.1, letterSpacing: -0.7, color: D.ink }}>
            Prefer to <em>talk</em>?
          </div>
          <div style={{ marginTop: 24, display: 'grid', gap: 14 }}>
            {[
              ['Sales · new accounts', '(678) 555-0142', 'sales@unitemedical.com'],
              ['Customer service', '(678) 555-0180', 'support@unitemedical.com'],
              ['Government / VA', '(678) 555-0219', 'gov@unitemedical.com'],
              ['Dealer program', '(678) 555-0255', 'dealers@unitemedical.com'],
              ['Vendor / import partnerships', '(678) 555-0277', 'vendors@unitemedical.com'],
            ].map(([name, phone, email], i) => (
              <div key={i} style={{ padding: 20, background: D.card, borderRadius: 12, border: `1px solid ${D.line}` }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{name.toUpperCase()}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <div style={{ fontFamily: D.display, fontSize: 22, color: D.ink, letterSpacing: -0.3 }}>{phone}</div>
                  <div style={{ fontSize: 13, color: D.ink2, alignSelf: 'end' }}>{email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
