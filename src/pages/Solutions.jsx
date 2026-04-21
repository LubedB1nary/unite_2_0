import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { PartnerMarquee } from '../components/shared/PartnerMarquee.jsx';
import { useViewport } from '../lib/viewport.js';

const SOLUTIONS = [
  {
    id: 'asc',
    eyebrow: 'AMBULATORY SURGERY CENTERS',
    title: 'Ambulatory Surgery Centers',
    short: 'Procedure-specific bundles, no MOQs, same-day ship.',
    long: 'A formulary built around the CPT codes you actually run. We assemble case carts, ship 48 hr median, and a dedicated rep handles every reorder.',
    tam: '$45.6B',
    growth: '21% CAGR · 2029',
    customers: '+340 ASCs',
    path: '/segments/asc',
    photo: 'OR turnover, golden hour',
    features: [
      'Pre-built case carts for 60+ CPT codes',
      'Same-day ship from Atlanta · 48 hr median',
      'Dedicated rep, not a call tree',
      'Direct-bill or PO · Net-30 standard',
    ],
  },
  {
    id: 'pharmacy',
    eyebrow: 'INDEPENDENT PHARMACIES',
    title: 'Independent Pharmacies',
    short: 'Private-label diagnostics & front-of-store DME.',
    long: 'White-label rapid tests, OTC bracing, and Clyne-powered telehealth let independents compete with the chains on margin and patient experience.',
    tam: '$15-20B',
    growth: 'Drop-ship ready',
    customers: '+820 stores',
    path: '/segments/pharmacy',
    photo: 'pharmacy counter, late afternoon',
    features: [
      'Drop-ship to store or to patient',
      'Private-label diagnostics in your branding',
      'Clyne telehealth integration · 50/50 split',
      'PSAO-friendly pricing for buying groups',
    ],
  },
  {
    id: 'gov',
    eyebrow: 'GOVERNMENT & VA',
    title: 'Government & VA',
    short: 'MSPV BPA · Veteran-owned · Berry compliant.',
    long: 'A Service-Disabled Veteran-Owned Small Business with active MSPV BPA. Every SKU country-of-origin documented. Buy America Act and Berry compliant inventory in stock.',
    tam: '$5-10B',
    growth: 'CAGE 8MK70',
    customers: 'VHA · DoD · DLA',
    path: '/segments/gov',
    photo: 'pallet of MSPV-tagged goods',
    features: [
      'MSPV BPA · 36C24123A0077',
      'CAGE 8MK70 · DUNS 117553945',
      'Berry-compliant Medava PPE inventory',
      'TAA documentation for every SKU',
    ],
  },
  {
    id: 'ems',
    eyebrow: 'FIRST RESPONDERS & EMS',
    title: 'First Responders & EMS',
    short: 'Trauma kits, NFPA-aligned restock, mass-casualty packs.',
    long: 'Built by an Army logistics officer. CoTCCC-compliant IFAKs, monthly truck-restock subscriptions, and mass-casualty rapid response packs ready to ship.',
    tam: '$3-5B',
    growth: 'NFPA 1917 aligned',
    customers: 'EMS · Fire · LE',
    path: '/segments/ems',
    photo: 'IFAK on tailboard',
    features: [
      'CoTCCC-compliant trauma kits',
      'Monthly per-rig restock subscriptions',
      'Mass-casualty 10-patient rapid packs',
      'GSA-friendly invoicing for municipal',
    ],
  },
  {
    id: 'distributors',
    eyebrow: 'REGIONAL DISTRIBUTORS',
    title: 'Regional Distributors',
    short: 'White-label imports, drop-ship, FDA-registered partner.',
    long: 'Plug your catalog into our supply chain. FDA-registered import, transparent landed cost, and EDI-ready drop-ship that returns tracking to your portal.',
    tam: '$10-15B',
    growth: 'FDA #3015727296',
    customers: '120+ partners',
    path: '/segments/distributors',
    photo: 'container yard at dawn',
    features: [
      'EDI 850 / 855 / 856 · drop-ship in 24 hr',
      'White-label and private-label programs',
      'Transparent landed cost (no hidden tiers)',
      'Quarterly QBR with dedicated AM',
    ],
  },
];

const COMPARE_ROWS = [
  ['Minimum order', '0 units', 'Pallet quantities', 'Pallet quantities'],
  ['Median ship time', '48 hours', '5-7 days', '3-5 days'],
  ['Reps per account', 'Dedicated', 'Pooled call center', 'Pooled call center'],
  ['Landed-cost transparency', 'Itemized', 'Bundled', 'Bundled'],
  ['VOSB / Berry compliant', 'Yes', 'Sometimes', 'Sometimes'],
  ['EDI / drop-ship', 'Standard', 'Tiered upcharge', 'Tiered upcharge'],
];

const STAGES = [
  { n: '01', t: 'Discovery call', s: 'A 20-minute conversation about your codes, your volume, and the gaps your current supplier leaves.' },
  { n: '02', t: 'Custom formulary', s: 'We build the SKU list around how you actually order — not a generic catalog dump.' },
  { n: '03', t: 'Onboarding', s: 'PunchOut, EDI, or a portal login — whatever your team already uses. Zero double entry.' },
  { n: '04', t: 'Quarterly review', s: 'Your rep brings the data: spend by code, fill rate, savings vs. last quarter. Adjust as you grow.' },
];

export function Solutions() {
  const navigate = useNavigate();
  const [active, setActive] = useState('asc');
  const seg = useMemo(() => SOLUTIONS.find((s) => s.id === active), [active]);
  const { isMobile, isTablet } = useViewport();
  const padX = isMobile ? 20 : 40;

  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <main id="main">
        <PageHead
          eyebrow="SOLUTIONS · BY WHO YOU ARE"
          title={<>One supply chain.<br /><Grad>Five front lines.</Grad></>}
          sub="Surgery centers, independent pharmacies, the VA, EMS, and regional distributors all run on different rules. We built the operating system that speaks each one fluently."
        />

        <section style={{ padding: `24px ${padX}px 0` }}>
          <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)', gap: isMobile ? 8 : 12 }}>
            {SOLUTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                aria-pressed={active === s.id}
                style={{
                  textAlign: 'left',
                  background: active === s.id ? D.plum : D.card,
                  color: active === s.id ? D.paper : D.ink,
                  border: `1px solid ${active === s.id ? D.plum : D.line}`,
                  borderRadius: 12,
                  padding: '18px 18px 16px',
                  cursor: 'pointer',
                  fontFamily: D.sans,
                  transition: 'background .2s, color .2s, border-color .2s',
                }}
              >
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1.1, opacity: active === s.id ? 0.75 : 0.55 }}>{s.tam} TAM</div>
                <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, marginTop: 8, lineHeight: 1.1 }}>{s.title}</div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ padding: `32px ${padX}px 64px` }}>
          <div
            key={seg.id}
            className="um-fade-up"
            style={{
              maxWidth: 1360,
              margin: '0 auto',
              background: D.card,
              border: `1px solid ${D.line}`,
              borderRadius: 18,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
            }}
          >
            <div style={{ padding: isMobile ? 24 : 48 }}>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>{seg.eyebrow}</div>
              <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 5.6vw, 56px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.02, margin: '14px 0 0' }}>{seg.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: D.ink2, marginTop: 18, maxWidth: 540 }}>{seg.long}</p>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14, marginTop: 28 }}>
                {seg.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: D.ink, lineHeight: 1.4 }}>
                    <span style={{ color: D.plum, marginTop: 2, flexShrink: 0 }}><Icon.check /></span>
                    {f}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate(seg.path)}
                  style={{ background: D.ink, color: D.paper, border: 'none', padding: '13px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: D.sans, display: 'inline-flex', alignItems: 'center', gap: 10 }}
                >
                  Open the {seg.title.split(' ')[0]} playbook <Icon.arrow />
                </button>
                <button
                  onClick={() => navigate('/quote')}
                  style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '13px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: D.sans }}
                >
                  Start a quote
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 36, paddingTop: 28, borderTop: `1px solid ${D.line}` }}>
                {[
                  ['TAM', seg.tam],
                  ['Growth', seg.growth],
                  ['On the platform', seg.customers],
                ].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{l.toUpperCase()}</div>
                    <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.4, color: D.ink, marginTop: 6 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: D.paperAlt, padding: isMobile ? 16 : 24, display: 'flex', alignItems: 'stretch' }}>
              <div style={{ flex: 1 }}>
                <PhotoPlaceholder caption={seg.photo} height={isMobile ? 240 : 520} stripeFrom="#e8ddcd" stripeTo="#d9c8b0" textColor={D.plum} />
              </div>
            </div>
          </div>
        </section>

        <PartnerMarquee
          eyebrow="ON THE LINE WITH"
          background={D.paperAlt}
          reverse
          speed="slow"
        />

        <section style={{ padding: `${isMobile ? 56 : 96}px ${padX}px`, background: D.paper }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 22 : 64, alignItems: 'end' }}>
              <div>
                <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 14 }}>HOW WE COMPARE</div>
                <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 5.6vw, 56px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.02, margin: 0 }}>
                  Side-by-side<br />with the <Grad>Big 3</Grad>.
                </h2>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: D.ink2, margin: 0, maxWidth: 520 }}>
                The features below aren&apos;t add-ons or upgraded tiers. They&apos;re how we run, by default, for every customer. No quota minimums to hit them.
              </p>
            </div>

            <div className={isMobile ? 'um-scroll-x' : ''} style={{ marginTop: 32, border: `1px solid ${D.line}`, borderRadius: 16, overflow: isMobile ? 'auto' : 'hidden', background: D.card }}>
              <div style={{ minWidth: isMobile ? 640 : 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', background: D.paperAlt, fontFamily: D.mono, fontSize: 11, letterSpacing: 1.2, color: D.ink3, padding: '14px 24px' }}>
                  <div></div>
                  <div style={{ color: D.plum }}>UNITE MEDICAL</div>
                  <div>BIG-3 STANDARD</div>
                  <div>OTHER REGIONALS</div>
                </div>
                {COMPARE_ROWS.map((row, i) => (
                  <div
                    key={row[0]}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
                      padding: '18px 24px',
                      borderTop: i === 0 ? 'none' : `1px solid ${D.line}`,
                      fontSize: 14,
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ color: D.ink, fontWeight: 500 }}>{row[0]}</div>
                    <div style={{ color: D.plum, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon.check /> {row[1]}
                    </div>
                    <div style={{ color: D.ink2 }}>{row[2]}</div>
                    <div style={{ color: D.ink2 }}>{row[3]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: `${isMobile ? 56 : 96}px ${padX}px`, background: D.paperAlt, borderTop: `1px solid ${D.line}`, borderBottom: `1px solid ${D.line}` }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>ONBOARDING · 14 DAYS</div>
            <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 5.6vw, 56px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.02, margin: '14px 0 32px' }}>
              From first call to <Grad>first pallet</Grad>.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 14 }}>
              {STAGES.map((st) => (
                <div key={st.n} style={{ background: D.card, border: `1px solid ${D.line}`, borderRadius: 14, padding: 28 }}>
                  <div style={{ fontFamily: D.display, fontSize: 56, color: D.plum, letterSpacing: -1.2, lineHeight: 1 }}>{st.n}</div>
                  <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, color: D.ink, marginTop: 14, lineHeight: 1.2 }}>{st.t}</div>
                  <div style={{ fontSize: 13.5, color: D.ink2, marginTop: 10, lineHeight: 1.55 }}>{st.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: `${isMobile ? 56 : 96}px ${padX}px`, background: D.paper }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'end', marginBottom: 32, flexWrap: 'wrap', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
              <div>
                <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>PROOF</div>
                <h2 style={{ fontFamily: D.display, fontSize: 'clamp(34px, 5.6vw, 56px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.02, margin: '12px 0 0' }}>
                  Customers, in their <em>own</em> words.
                </h2>
              </div>
              <button onClick={() => navigate('/blog')} style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '12px 22px', borderRadius: 999, cursor: 'pointer', fontFamily: D.sans, fontSize: 14 }}>
                Read case studies
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 14 }}>
              {[
                {
                  q: 'Switched from Medline because the MOQs weren\u2019t working for a 4-OR center. Unite had our first order on the dock in 48 hours.',
                  who: 'Sarah Chen',
                  role: 'Materials Director · Atlanta Surgical Center',
                  seg: 'ASC',
                },
                {
                  q: 'Their private-label rapid tests gave us a 38% margin lift, and the drop-ship to patient option turned our pharmacy into a telehealth fulfillment node overnight.',
                  who: 'Kareem Holloway, PharmD',
                  role: 'Owner · Holloway Apothecary, Macon GA',
                  seg: 'Pharmacy',
                },
                {
                  q: 'Berry compliance documentation, on-time delivery, and an actual rep who picks up. That\u2019s all we needed. Took the Big 3 nine months and they still couldn\u2019t.',
                  who: 'Major (Ret.) D. Vasquez',
                  role: 'Procurement Lead · Regional VHA',
                  seg: 'Government',
                },
              ].map((t) => (
                <figure key={t.who} style={{ background: D.card, border: `1px solid ${D.line}`, borderRadius: 16, padding: 28, margin: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>{t.seg.toUpperCase()}</div>
                  <blockquote style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3, color: D.ink, marginTop: 12, lineHeight: 1.3, flex: 1, fontStyle: 'italic' }}>
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${D.line}` }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: D.ink }}>{t.who}</div>
                    <div style={{ fontSize: 12.5, color: D.ink2, marginTop: 2 }}>{t.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: `${isMobile ? 72 : 120}px ${padX}px`, background: D.ink, color: D.paper }}>
          <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 28 : 72, alignItems: 'center' }}>
            <h2 style={{ fontFamily: D.display, fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 400, letterSpacing: 'clamp(-1px, -0.19vw, -1.8px)', lineHeight: 1.0, margin: 0 }}>
              Don&apos;t see your<br /><Grad>front line?</Grad>
            </h2>
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: '#cfc4d2', margin: 0 }}>
                If you move medical supplies for a living and the Big 3 keep failing you, we want to hear about it. We design new playbooks every quarter based on what customers ask for.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/contact')} style={{ background: D.plum, color: D.paper, border: 'none', padding: '15px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  Talk to us <Icon.arrow />
                </button>
                <button onClick={() => navigate('/quote')} style={{ background: 'transparent', color: D.paper, border: `1.5px solid ${D.paper}`, padding: '15px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: D.sans }}>
                  Send a quote request
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
