import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { db } from '../lib/db.js';
import { gmail } from '../lib/services.js';
import { uid } from '../lib/format.js';

const CREDENTIALS = [
  { label: 'FDA Registered', val: '3015727296', sub: 'Device distribution', anchor: 'fda' },
  { label: 'MSPV BPA', val: '36C24123A0077', sub: 'Veterans Health Administration', anchor: 'mspv' },
  { label: 'CAGE Code', val: '8MK70', sub: 'Federal contracting identifier', anchor: 'cage' },
  { label: 'DUNS', val: '117553945', sub: 'SAM.gov registered', anchor: 'duns' },
  { label: 'VOSB', val: 'Verified', sub: 'Veteran-Owned Small Business', anchor: 'vosb' },
  { label: 'TAA Compliant', val: 'Documented', sub: 'Country of origin per SKU', anchor: 'taa' },
  { label: 'Berry Compliant', val: 'Medava PPE line', sub: 'Buy America Act', anchor: 'berry' },
  { label: 'PDAC Approved', val: '48 SKUs', sub: 'Medicare billing codes', anchor: 'pdac' },
];

const POLICIES = [
  { t: 'Quality management', s: 'ISO 13485-aligned procedures across receiving, storage, and order picking. Every lot scanned, every temperature logged, every recall traceable to a customer in under 30 minutes.' },
  { t: 'Cold chain', s: 'Validated 2–8 °C and -20 °C storage in Atlanta and Reno DCs. Continuous monitoring with audit-trail exports for state board and DEA inspections.' },
  { t: 'Country-of-origin', s: 'Every SKU tied to a documented country of origin and HTS code. TAA, Buy America, and Berry compliance certifications generated on demand from your portal.' },
  { t: 'Recalls & adverse events', s: 'Lot-level traceability lets us notify affected customers within one business day. MDR-eligible reports filed to FDA on the customer\u2019s behalf when requested.' },
  { t: 'Data & privacy', s: 'Customer data stored in SOC 2 Type II environments. No PHI handled by Unite without a signed BAA. Retention and deletion policies aligned with HIPAA Privacy Rule.' },
  { t: 'Supplier qualification', s: 'Every manufacturer audited against an internal questionnaire covering FDA registration, ISO certification, financial health, and onboarding posture before approval.' },
];

function DocLibrary() {
  const [requested, setRequested] = useState(new Set());
  const [busy, setBusy] = useState(null);

  async function request(doc) {
    setBusy(doc);
    db.insert('doc_requests', { id: uid('dr'), doc, requested_at: new Date().toISOString(), status: 'queued' });
    await gmail.send({ to: 'compliance@unitemedical.com', subject: `Doc request · ${doc}`, body: `Customer requested: ${doc}` });
    setRequested((s) => new Set([...s, doc]));
    setBusy(null);
  }

  const docs = [
    'W-9 · current FY',
    'Certificate of Insurance · $5M aggregate',
    'Business Associate Agreement (HIPAA)',
    'FDA Establishment Registration',
    'TAA / Berry country-of-origin attestations',
    'SOC 2 Type II report (NDA required)',
    'Recall procedure SOP-014',
    'Capability statement (federal)',
  ];

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {docs.map((d) => {
        const isReq = requested.has(d);
        return (
          <li key={d} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderTop: `1px solid ${D.line}`, fontSize: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: D.ink }}>
              <span style={{ color: D.plum }}><Icon.shield /></span>
              {d}
            </span>
            <button disabled={isReq || busy === d} onClick={() => request(d)} style={{ background: 'transparent', color: isReq ? D.ink3 : D.plum, border: 'none', cursor: isReq ? 'default' : 'pointer', fontFamily: D.mono, fontSize: 11, letterSpacing: 1, padding: 0 }}>
              {busy === d ? 'SENDING…' : isReq ? '✓ REQUESTED' : 'REQUEST'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Compliance() {
  const navigate = useNavigate();
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <main id="main">
        <PageHead
          eyebrow="COMPLIANCE · CREDENTIALS · POLICY"
          title={<>The paperwork,<br /><Grad>kept clean.</Grad></>}
          sub="Distribution is a regulated business. Below are the certifications, policies, and audit trails that keep us trusted by VHA procurement, ASCs, and pharmacy boards across 38 states."
        />

        <section id="credentials" style={{ padding: '24px 40px 80px' }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
              {CREDENTIALS.map((c) => (
                <div key={c.label} id={c.anchor} style={{ borderTop: `2px solid ${D.plum}`, padding: '20px 0' }}>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3 }}>{c.label.toUpperCase()}</div>
                  <div style={{ fontFamily: D.display, fontSize: 26, letterSpacing: -0.4, color: D.ink, marginTop: 8 }}>{c.val}</div>
                  <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: D.paperAlt, padding: '96px 40px', borderTop: `1px solid ${D.line}`, borderBottom: `1px solid ${D.line}` }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 18 }}>POLICIES</div>
            <h2 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.2, lineHeight: 1, margin: 0 }}>
              Documented. Auditable. <Grad>On request.</Grad>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginTop: 40 }}>
              {POLICIES.map((p) => (
                <div key={p.t} style={{ background: D.card, border: `1px solid ${D.line}`, borderRadius: 14, padding: 28 }}>
                  <div style={{ fontFamily: D.display, fontSize: 24, letterSpacing: -0.4, color: D.ink }}>{p.t}</div>
                  <p style={{ fontSize: 14.5, color: D.ink2, marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>{p.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="docs" style={{ padding: '96px 40px', background: D.paper }}>
          <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 18 }}>DOCUMENT REQUESTS</div>
              <h2 style={{ fontFamily: D.display, fontSize: 48, fontWeight: 400, letterSpacing: -1, lineHeight: 1.05, margin: 0 }}>
                Need a W-9, COI,<br />or BAA?
              </h2>
              <p style={{ fontSize: 15, color: D.ink2, marginTop: 16, lineHeight: 1.6 }}>
                Most documents are auto-generated from your portal in under a minute. The rest, our compliance team turns around inside one business day.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/contact')} style={{ background: D.ink, color: D.paper, border: 'none', padding: '13px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: D.sans, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  Request documents <Icon.arrow />
                </button>
              </div>
            </div>

            <div style={{ background: D.card, border: `1px solid ${D.line}`, borderRadius: 16, padding: 32 }}>
              <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.2, color: D.ink3, marginBottom: 14 }}>SELF-SERVE LIBRARY</div>
              <DocLibrary />
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 40px', background: D.plum, color: D.paper }}>
          <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
            <h2 style={{ fontFamily: D.display, fontSize: 48, fontWeight: 400, letterSpacing: -1, lineHeight: 1.05, margin: 0 }}>
              Audit-ready. Inspector-friendly.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: D.plumSoft, margin: 0 }}>
              State board, DEA, FDA, JCAHO — if it walks through your door asking about supplier qualification, point them at us. We&apos;ll be on the phone before they finish their second cup of coffee.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
