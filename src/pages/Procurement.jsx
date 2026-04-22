import { useNavigate } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PageHead } from '../components/layout/PageHead.jsx';
import { Grad } from '../components/shared/Grad.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { useViewport } from '../lib/viewport.js';
import { useSEO } from '../lib/seo.js';

const FEATURES = [
  { t: 'Punch-out catalog (cXML, OCI)', s: 'Drop our catalog into your e-procurement suite — Coupa, Ariba, Workday, GSA Advantage. Carts return as fully formed POs.' },
  { t: 'EDI 850 / 855 / 856 / 810', s: 'Native EDI for purchase orders, acknowledgements, ASNs, and invoices. We onboard new VANs in two business days.' },
  { t: 'Contract pricing', s: 'Customer-specific catalogs and tiered pricing visible to your buyers after login. No more shadow price files in Excel.' },
  { t: 'Approval workflows', s: 'Two-, three-, or four-level approval chains routed by spend threshold or category. Approvals notify by email or push to Slack.' },
  { t: 'Standing orders', s: 'Schedule recurring deliveries by week, month, or quarter. We hold inventory and ship without re-ordering.' },
  { t: 'CSV / XLSX bulk upload', s: 'Drop a spreadsheet of SKUs and quantities; we validate, suggest substitutions for OOS items, and generate a cart in one pass.' },
  { t: 'Reporting & exports', s: 'Spend by category, by buyer, by department, by GL code. Export to QuickBooks, NetSuite, or generic CSV.' },
  { t: 'Audit-ready', s: 'Every order, login, and approval is timestamped and exportable for SOX, JCAHO, or state-board audits.' },
];

export function Procurement() {
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  useSEO({
    title: 'Procurement — punch-out, EDI, contract pricing, approvals',
    description:
      'Coupa / Ariba / Workday / GSA Advantage punch-out. EDI 850/855/856/810 standard. Customer-specific contract pricing, multi-level approval workflows, audit-ready exports.',
    canonical: '/procurement',
  });
  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <main id="main">
        <PageHead
          eyebrow="ENTERPRISE PROCUREMENT"
          title={<>For buying teams who already <Grad>have a stack</Grad>.</>}
          sub="Punch-out, EDI, contract pricing, approval routing — all the boring infrastructure your sourcing team needs to swap us in without changing how anyone else works."
        />
        <section style={{ padding: `24px ${padX}px ${isMobile ? 56 : 96}px` }}>
          <div style={{ maxWidth: 1360, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
              {FEATURES.map((f) => (
                <div key={f.t} style={{ background: D.card, border: `1px solid ${D.line}`, borderRadius: 14, padding: 28, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: D.paperAlt, color: D.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon.shield /></div>
                  <div>
                    <div style={{ fontFamily: D.display, fontSize: 22, letterSpacing: -0.3 }}>{f.t}</div>
                    <p style={{ fontSize: 14.5, color: D.ink2, marginTop: 8, lineHeight: 1.55, marginBottom: 0 }}>{f.s}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: isMobile ? 32 : 48, background: D.ink, color: D.paper, borderRadius: 16, padding: isMobile ? 24 : 40, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 18 : 56, alignItems: 'center' }}>
              <h2 style={{ fontFamily: D.display, fontSize: 'clamp(28px, 4.8vw, 44px)', fontWeight: 400, letterSpacing: -1, lineHeight: 1.05, margin: 0 }}>
                Get a punch-out demo on <Grad>your test environment</Grad>.
              </h2>
              <div>
                <p style={{ color: '#cfc4d2', lineHeight: 1.6, margin: 0 }}>Send us your Coupa or Ariba sandbox details and we&apos;ll have an authenticated session running for your buyers in 48 hours.</p>
                <button onClick={() => navigate('/contact')} style={{ marginTop: 18, background: D.plum, color: D.paper, border: 'none', padding: '13px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  Schedule integration call <Icon.arrow />
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
