import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { Icon } from '../components/shared/Icon.jsx';

const ROLES = [
  { title: 'Senior Backend Engineer · Quoting Engine', dept: 'Engineering', loc: 'Lithia Springs, GA · or remote', type: 'Full-time' },
  { title: 'Account Executive · ASCs (Southeast)', dept: 'Sales', loc: 'Atlanta, GA', type: 'Full-time · 1099 OK' },
  { title: 'Compliance Lead · FDA + GUDID', dept: 'Operations', loc: 'Lithia Springs, GA', type: 'Full-time' },
  { title: 'Government Capture Manager', dept: 'Sales', loc: 'Remote · DC preferred', type: 'Full-time' },
  { title: 'Warehouse Lead · Reno DC', dept: 'Operations', loc: 'Reno, NV', type: 'Full-time' },
  { title: 'Brand Designer', dept: 'Marketing', loc: 'Atlanta, GA · hybrid', type: 'Full-time' },
];

export function Careers() {
  const navigate = useNavigate();
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <main id="main">
        <PageHead
          eyebrow="CAREERS · BUILD WITH US"
          title={<>Help us run<br /><Grad>like a soldier.</Grad></>}
          sub="We're 60-something people on three coasts, building the operating system for American medical supply. Come ship something that ends up on a hospital floor."
        />
        <section style={{ padding: '24px 40px 96px' }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36 }}>
              {[['$0', 'Co-pay healthcare'], ['Vested', 'Equity from day one'], ['12 wk', 'Parental leave'], ['Unlimited', 'PTO (we mean it)']].map(([b, s]) => (
                <div key={s} style={{ background: D.card, border: `1px solid ${D.line}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ fontFamily: D.display, fontSize: 32, color: D.plum, letterSpacing: -0.5 }}>{b}</div>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginTop: 8 }}>{s.toUpperCase()}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 14 }}>OPEN ROLES · {ROLES.length}</div>
            <div style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
              {ROLES.map((r, i) => (
                <div key={r.title} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.4fr 1fr auto', gap: 16, alignItems: 'center', padding: '20px 24px', borderTop: i === 0 ? 'none' : `1px solid ${D.line}` }}>
                  <div style={{ fontFamily: D.display, fontSize: 20, letterSpacing: -0.3 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: D.ink2 }}>{r.dept}</div>
                  <div style={{ fontSize: 13, color: D.ink2 }}>{r.loc}</div>
                  <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1, color: D.plum }}>{r.type.toUpperCase()}</div>
                  <button onClick={() => navigate('/contact')} style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '9px 16px', borderRadius: 999, cursor: 'pointer', fontSize: 13 }}>Apply →</button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 64, background: D.plum, color: D.paper, borderRadius: 16, padding: 40, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, alignItems: 'center' }}>
              <h2 style={{ fontFamily: D.display, fontSize: 40, fontWeight: 400, letterSpacing: -0.8, lineHeight: 1, margin: 0 }}>
                Don&apos;t see your role? Send a note anyway.
              </h2>
              <div>
                <p style={{ color: D.plumSoft, lineHeight: 1.6, margin: 0 }}>We hire ahead of postings when the right person walks in. If you&apos;re building careers in healthcare, supply chain, or B2B platforms, we want to hear from you.</p>
                <button onClick={() => navigate('/contact')} style={{ marginTop: 18, background: D.paper, color: D.plum, border: 'none', padding: '13px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  Open application <Icon.arrow />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
