import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';

const posts = [
  { title: "What McKesson's Med-Surg spin-off means for regional ASCs", cat: 'Market', date: 'Apr 12', read: 8, feat: true },
  { title: 'Reading a PDAC denial letter (and fixing it on the first resubmit)', cat: 'Compliance', date: 'Apr 08', read: 6 },
  { title: 'Why we stopped charging MOQs — and what it cost us', cat: 'Story', date: 'Apr 02', read: 5 },
  { title: 'Landed cost math for the non-CFO', cat: 'Ops', date: 'Mar 27', read: 7 },
  { title: 'Inside a 48-hour Flexport customs clear', cat: 'Ops', date: 'Mar 20', read: 9 },
  { title: 'The case for buying domestic PPE (with receipts)', cat: 'Policy', date: 'Mar 14', read: 4 },
  { title: "Fathom + Claude: how our 1099 reps never miss an action item", cat: 'Tools', date: 'Mar 08', read: 6 },
];

export function Blog() {
  const navigate = useNavigate();
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <PageHead eyebrow="FIELD NOTES"
        title={<>The <em>journal</em>.</>}
        sub="Market takes, compliance walkthroughs, operational notes from the warehouse floor. Written by people who do the work." />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '24px 40px 80px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {['All', 'Market', 'Compliance', 'Story', 'Ops', 'Policy', 'Tools'].map((t, i) => (
            <button key={t} style={{
              background: i === 0 ? D.plum : D.card, color: i === 0 ? D.paper : D.ink2,
              border: `1px solid ${i === 0 ? D.plum : D.line}`, padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontFamily: D.sans,
            }}>{t}</button>
          ))}
        </div>
        <div onClick={() => navigate('/blog/mckesson-spin-off')} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, marginBottom: 32, background: D.card, border: `1px solid ${D.line}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
          <PhotoPlaceholder caption="featured · market analysis" height={380} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} radius={0} />
          <div style={{ padding: 32, alignSelf: 'center' }}>
            <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>MARKET · APR 12 · 8 MIN READ</div>
            <div style={{ fontFamily: D.display, fontSize: 44, fontWeight: 400, letterSpacing: -1, lineHeight: 1.05, marginTop: 14 }}>{posts[0].title}</div>
            <div style={{ fontSize: 15, color: D.ink2, marginTop: 16, lineHeight: 1.6 }}>A 12-24 month customer acquisition window opens as Med-Surg spins off. Here's who moves first and why.</div>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: D.ink }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: D.plum }} /> By Damon Reed
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {posts.slice(1).map((p, i) => (
            <div key={i} onClick={() => navigate('/blog/mckesson-spin-off')} style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.line}`, overflow: 'hidden', cursor: 'pointer' }}>
              <PhotoPlaceholder caption={p.cat.toLowerCase()} height={180} stripeFrom="#ebe3d3" stripeTo="#ddd1b7" textColor={D.plum} radius={0} />
              <div style={{ padding: 22 }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{p.cat.toUpperCase()} · {p.date} · {p.read} MIN</div>
                <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.4, lineHeight: 1.2, marginTop: 10, minHeight: 76 }}>{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
