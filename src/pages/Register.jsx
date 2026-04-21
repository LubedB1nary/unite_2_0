import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { UMLogo } from '../components/shared/Logo.jsx';
import { Grad } from '../components/shared/Grad.jsx';

const steps = [
  { step: '01', title: 'Organization', fields: [['Legal name', 'Sunrise Ambulatory Surgery Center'], ['DBA (optional)', '—'], ['Website', 'sunrise-asc.com'], ['Annual medical spend', '$1–5M']] },
  { step: '02', title: 'Primary contact', fields: [['First name', 'Jessica'], ['Last name', 'Garcia'], ['Work email', '—'], ['Phone', '—']] },
  { step: '03', title: 'Segment & tax', fields: [['Segment', 'Ambulatory Surgery Center'], ['State', 'Georgia'], ['Tax-exempt?', 'Yes · EIN on file'], ['Billing terms', 'Net-30']] },
];

export function Register() {
  const navigate = useNavigate();
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <div style={{ padding: '32px 40px', borderBottom: `1px solid ${D.line}` }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <UMLogo size={28} color={D.ink} weight={600} />
          </div>
          <div style={{ fontSize: 13, color: D.ink2 }}>Already have an account? <span onClick={() => navigate('/login')} style={{ color: D.plum, textDecoration: 'underline', cursor: 'pointer' }}>Sign in</span></div>
        </div>
      </div>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 22 }}>REQUEST AN ACCOUNT · 2 MIN</div>
        <h1 style={{ fontFamily: D.display, fontSize: 84, fontWeight: 400, letterSpacing: -2, lineHeight: 0.98, margin: 0, maxWidth: 720 }}>
          Tell us about your <Grad>organization</Grad>.
        </h1>
        <div style={{ fontSize: 16, color: D.ink2, marginTop: 22, maxWidth: 600, lineHeight: 1.55 }}>We approve accounts within one business day. You'll get wholesale pricing, net-30 terms, and a dedicated rep for your segment.</div>
        <div style={{ marginTop: 48, display: 'grid', gap: 28 }}>
          {steps.map((s) => (
            <div key={s.step} style={{ padding: 28, background: D.card, border: `1px solid ${D.line}`, borderRadius: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 32, alignItems: 'start' }}>
                <div>
                  <div style={{ fontFamily: D.display, fontSize: 56, color: D.plum, letterSpacing: -1.2, lineHeight: 1 }}>{s.step}</div>
                  <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, marginTop: 6 }}>{s.title}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {s.fields.map(([label, val]) => (
                    <label key={label}>
                      <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{label.toUpperCase()}</div>
                      <div style={{ marginTop: 6, padding: '12px 14px', background: D.paper, border: `1px solid ${D.line}`, borderRadius: 10, fontSize: 14, color: D.ink2 }}>{val}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 14, alignItems: 'center' }}>
          <button style={{ background: D.plum, color: D.paper, border: 'none', padding: '16px 36px', borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Submit application →</button>
          <div style={{ fontSize: 13, color: D.ink2 }}>Approved within 1 business day · we'll email + call your primary contact</div>
        </div>
      </div>
    </div>
  );
}
