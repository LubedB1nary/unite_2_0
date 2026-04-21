import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { UMLogo } from '../components/shared/Logo.jsx';
import { Grad } from '../components/shared/Grad.jsx';

export function Login() {
  const navigate = useNavigate();
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ padding: '64px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <UMLogo size={32} color={D.ink} weight={600} />
        </div>
        <div style={{ maxWidth: 420 }}>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 24 }}>SIGN IN · B2B PORTAL</div>
          <h1 style={{ fontFamily: D.display, fontSize: 68, fontWeight: 400, letterSpacing: -1.6, lineHeight: 0.98, margin: 0 }}>
            Welcome <Grad>back</Grad>.
          </h1>
          <div style={{ fontSize: 15, color: D.ink2, marginTop: 18, lineHeight: 1.55 }}>Your net-30 terms, saved lists, and dedicated rep — all behind one login.</div>
          <div style={{ marginTop: 32 }}>
            {['Work email', 'Password'].map((f, i) => (
              <div key={f} style={{ marginTop: i === 0 ? 0 : 14 }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{f.toUpperCase()}</div>
                <div style={{ marginTop: 6, padding: '14px 16px', background: D.card, border: `1px solid ${D.line}`, borderRadius: 10, fontSize: 14, color: D.ink2 }}>
                  {i === 0 ? 'j.garcia@sunrise-asc.com' : '•••••••••••'}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 13 }}>
              <label style={{ color: D.ink2, cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: D.plum, marginRight: 8 }} /> Remember this device
              </label>
              <span style={{ color: D.plum, textDecoration: 'underline', cursor: 'pointer' }}>Forgot password</span>
            </div>
            <button onClick={() => navigate('/dashboard')} style={{ marginTop: 22, width: '100%', background: D.plum, color: D.paper, border: 'none', padding: 14, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Sign in</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
              <div style={{ flex: 1, height: 1, background: D.line }} /><div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>OR</div><div style={{ flex: 1, height: 1, background: D.line }} />
            </div>
            <button style={{ width: '100%', background: D.card, color: D.ink, border: `1px solid ${D.line}`, padding: 13, borderRadius: 999, fontSize: 14, cursor: 'pointer' }}>Continue with SSO (Okta / Google)</button>
            <div style={{ marginTop: 20, fontSize: 13, color: D.ink2, textAlign: 'center' }}>
              New to Unite? <span onClick={() => navigate('/register')} style={{ color: D.plum, textDecoration: 'underline', cursor: 'pointer' }}>Request an account</span>
            </div>
          </div>
        </div>
        <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>FDA 3015727296 · VOSB · CAGE 8MK70</div>
      </div>
      <div style={{ background: D.plum, color: D.paper, padding: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <div />
        <div>
          <div style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.2, lineHeight: 1, fontStyle: 'italic' }}>
            "No trees, no queues — just the rep assigned to our segment."
          </div>
          <div style={{ marginTop: 24, fontSize: 14, color: D.plumSoft }}>Jessica Garcia · Sunrise ASC · 4 years on Unite</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
          {[['98.6%', 'Fill rate'], ['48 hr', 'Median ship'], ['4 yr', 'Avg tenure']].map(([b, s], i) => (
            <div key={i}>
              <div style={{ fontFamily: D.display, fontSize: 40, letterSpacing: -0.7, lineHeight: 1 }}>{b}</div>
              <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plumSoft, marginTop: 8 }}>{s.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
