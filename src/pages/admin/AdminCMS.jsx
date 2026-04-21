import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';

export function AdminCMS() {
  return (
    <AdminShell active="cms">
      <div style={{ padding: '40px 40px 32px', borderBottom: `1px solid ${D.line}` }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>CONTENT · CMS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <h1 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.3, lineHeight: 1, margin: 0 }}>Content & pages.</h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ background: 'transparent', color: D.ink, border: `1px solid ${D.line}`, padding: '10px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>Media library</button>
            <button style={{ background: D.plum, color: D.paper, border: 'none', padding: '10px 18px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>+ New page</button>
          </div>
        </div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${D.line}`, fontFamily: D.display, fontSize: 20, letterSpacing: -0.3 }}>Pages</div>
            {[
              ['Homepage', 'Published', 'Apr 18'],
              ['About · Veteran Owned', 'Published', 'Apr 10'],
              ['Segment · Ambulatory Surgery', 'Published', 'Mar 28'],
              ['Segment · Government / VA', 'Draft', 'Apr 21'],
              ['Services · PDAC Consulting', 'Published', 'Apr 02'],
              ['Services · Dealer Program', 'Published', 'Mar 20'],
              ['Contact', 'Published', 'Feb 14'],
            ].map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 100px 40px', padding: '12px 20px', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, fontSize: 13, alignItems: 'center' }}>
                <div style={{ color: D.ink }}>{r[0]}</div>
                <div>
                  <span style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, padding: '3px 8px', borderRadius: 999, background: r[1] === 'Published' ? 'rgba(45,106,79,.14)' : D.terraSoft, color: r[1] === 'Published' ? '#2d6a4f' : D.terra }}>{r[1].toUpperCase()}</span>
                </div>
                <div style={{ fontFamily: D.mono, fontSize: 11, color: D.ink3 }}>{r[2]}</div>
                <div style={{ color: D.plum, fontFamily: D.mono, fontSize: 11 }}>→</div>
              </div>
            ))}
          </div>
          <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${D.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: D.display, fontSize: 20, letterSpacing: -0.3 }}>Blog posts</div>
              <button style={{ background: 'transparent', color: D.plum, border: `1px solid ${D.plum}`, padding: '6px 12px', borderRadius: 999, fontSize: 11, cursor: 'pointer' }}>+ Draft</button>
            </div>
            {[
              ["What McKesson's Med-Surg spin-off means for ASCs", 'Market', 'Published', 'Apr 12'],
              ['Reading a PDAC denial letter', 'Compliance', 'Published', 'Apr 08'],
              ['Why we stopped charging MOQs', 'Story', 'Published', 'Apr 02'],
              ['Landed cost math for the non-CFO', 'Ops', 'Scheduled', 'Apr 24'],
              ['TJS launch retrospective', 'Story', 'Draft', '—'],
            ].map((r, i) => (
              <div key={i} style={{ padding: '12px 20px', borderTop: i === 0 ? 'none' : `1px solid ${D.line}` }}>
                <div style={{ fontSize: 13, color: D.ink }}>{r[0]}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 6, alignItems: 'center' }}>
                  <span style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, color: D.plum }}>{r[1].toUpperCase()}</span>
                  <span style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, padding: '2px 7px', borderRadius: 999, background: r[2] === 'Published' ? 'rgba(45,106,79,.14)' : r[2] === 'Scheduled' ? 'rgba(94,41,99,.12)' : D.terraSoft, color: r[2] === 'Published' ? '#2d6a4f' : r[2] === 'Scheduled' ? D.plum : D.terra }}>{r[2].toUpperCase()}</span>
                  <span style={{ fontFamily: D.mono, fontSize: 10, color: D.ink3, marginLeft: 'auto' }}>{r[3]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20 }}>
          <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontFamily: D.display, fontSize: 20, letterSpacing: -0.3 }}>Media library</div>
              <div style={{ fontFamily: D.mono, fontSize: 11, color: D.ink3 }}>1,284 ASSETS · 4.2 GB</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{ aspectRatio: 1, background: i % 5 === 0 ? D.plum : i % 3 === 0 ? D.terraSoft : D.paperAlt, borderRadius: 6, border: `1px solid ${D.line}` }} />
              ))}
            </div>
          </div>
          <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, padding: 20 }}>
            <div style={{ fontFamily: D.display, fontSize: 20, letterSpacing: -0.3, marginBottom: 14 }}>Site banners</div>
            {[
              ['Spring promo · 10% off PPE', 'Active', 'homepage hero'],
              ['McKesson transition · rep outreach', 'Scheduled Apr 23', 'site-wide strip'],
              ['New MSPV pricing', 'Draft', 'gov segment'],
            ].map((r, i) => (
              <div key={i} style={{ padding: 14, background: D.paper, borderRadius: 8, border: `1px solid ${D.line}`, marginTop: i === 0 ? 0 : 10 }}>
                <div style={{ fontSize: 13, color: D.ink }}>{r[0]}</div>
                <div style={{ fontSize: 11, color: D.ink2, marginTop: 4 }}>{r[2]} · <span style={{ color: D.plum }}>{r[1]}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
