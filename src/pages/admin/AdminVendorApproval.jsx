import { useState } from 'react';
import { D } from '../../tokens.js';
import { AdminShell } from '../../components/layout/AdminShell.jsx';
import { db } from '../../lib/db.js';
import { fmt } from '../../lib/format.js';
import { openfda, gs1, hts } from '../../lib/services.js';
import { useViewport } from '../../lib/viewport.js';

const BADGE = (s) => ({ pass: ['#2d6a4f', 'PASS'], warn: [D.terra, 'REVIEW'], fail: ['#c3382d', 'FAIL'], pending: [D.ink3, 'PENDING'] })[s] || ['#8f8490', '—'];

export function AdminVendorApproval() {
  const { isMobile } = useViewport();
  const padX = isMobile ? 18 : 40;
  const vendors = db.useTable('vendors', { orderBy: 'name' });
  const [activeId, setActiveId] = useState(vendors[0]?.id);
  const active = db.useRow('vendors', activeId);
  const [running, setRunning] = useState(false);
  const [checks, setChecks] = useState([]);

  async function runChecks() {
    if (!active) return;
    setRunning(true);
    setChecks([]);
    const fda = await openfda.classification('KGN');
    setChecks((c) => [...c, { name: 'openFDA device registration lookup', status: fda.results.length ? 'pass' : 'fail', detail: fda.results[0]?.name || 'Not found' }]);
    const gtin = await gs1.validateGTIN('00012345678905');
    setChecks((c) => [...c, { name: 'GS1 GTIN validation · top SKU', status: gtin.valid ? 'pass' : 'warn', detail: `GTIN ${gtin.gtin}` }]);
    const dutyA = await hts.lookup('9021.10');
    setChecks((c) => [...c, { name: 'HTS code audit', status: 'pass', detail: `${dutyA.description} · ${dutyA.mfn}% MFN` }]);
    setChecks((c) => [...c, { name: 'Country of origin / TAA', status: active.country === 'US' ? 'pass' : 'warn', detail: `Origin: ${active.country}` }]);
    setChecks((c) => [...c, { name: 'Insurance · product liability', status: 'fail', detail: 'Certificate not provided.' }]);
    setRunning(false);
  }

  function approve() {
    if (active) db.update('vendors', active.id, { status: 'approved', last_audit: new Date().toISOString() });
  }
  function reject() {
    if (active) db.update('vendors', active.id, { status: 'rejected', last_audit: new Date().toISOString() });
  }

  return (
    <AdminShell active="vendors">
      <div style={{ padding: `${isMobile ? 28 : 40}px ${padX}px ${isMobile ? 18 : 24}px`, borderBottom: `1px solid ${D.line}` }}>
        <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: 12 }}>VENDORS · APPROVAL REVIEW</div>
        <h1 style={{ fontFamily: D.display, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, letterSpacing: -1.2, lineHeight: 1.02, margin: 0 }}>{vendors.length} vendors</h1>
      </div>
      <div style={{ padding: isMobile ? 20 : 32, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '320px 1fr', gap: 20 }}>
        <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${D.line}`, fontFamily: D.display, fontSize: 18 }}>Vendors</div>
          {vendors.map((v) => {
            const [color, label] = BADGE(v.status);
            return (
              <button key={v.id} onClick={() => { setActiveId(v.id); setChecks([]); }} style={{ width: '100%', textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 80px', gap: 8, padding: '14px 16px', borderTop: `1px solid ${D.line}`, background: activeId === v.id ? 'rgba(94,41,99,.06)' : 'transparent', cursor: 'pointer', fontFamily: D.sans, color: D.ink, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{v.name}</div>
                  <div style={{ fontSize: 12, color: D.ink2 }}>{v.country} · audit {fmt.ago(v.last_audit) || 'never'}</div>
                </div>
                <span style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, padding: '3px 8px', borderRadius: 999, background: `${color}20`, color, textAlign: 'center' }}>{label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ background: D.card, borderRadius: 12, border: `1px solid ${D.line}`, padding: isMobile ? 22 : 28 }}>
          {!active && <div style={{ color: D.ink3 }}>Select a vendor to review.</div>}
          {active && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.plum }}>VENDOR · {active.country}</div>
                  <div style={{ fontFamily: D.display, fontSize: 36, letterSpacing: -0.7, lineHeight: 1.05, marginTop: 6 }}>{active.name}</div>
                  <div style={{ fontSize: 13, color: D.ink2, marginTop: 6 }}>FDA registered: {active.fda_registered ? 'yes' : 'no'} · GS1 validated: {active.gs1_validated ? 'yes' : 'pending'}</div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={reject} style={{ background: 'transparent', color: '#c3382d', border: '1.5px solid #c3382d', padding: '10px 18px', borderRadius: 999, fontSize: 13, cursor: 'pointer' }}>Reject</button>
                  <button onClick={approve} style={{ background: D.plum, color: D.paper, border: 'none', padding: '10px 22px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Approve as partner</button>
                </div>
              </div>

              <div style={{ marginTop: 28, display: 'flex', gap: 12, alignItems: 'center' }}>
                <button onClick={runChecks} disabled={running} style={{ background: D.ink, color: D.paper, border: 'none', padding: '11px 20px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: running ? 'wait' : 'pointer', opacity: running ? 0.6 : 1 }}>
                  {running ? 'Running checks…' : 'Run vendor approval checks (openFDA + GS1 + HTS)'}
                </button>
                <div style={{ fontFamily: D.mono, fontSize: 11, color: D.ink3 }}>{checks.length} of 5 complete</div>
              </div>

              <div style={{ marginTop: 24 }}>
                {checks.length === 0 && <div style={{ color: D.ink3, fontSize: 13 }}>No checks run yet. Hit the button.</div>}
                {checks.map((c, i) => {
                  const [color, label] = BADGE(c.status);
                  return (
                    <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 16, padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${D.line}`, alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{c.detail}</div>
                      </div>
                      <span style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, padding: '4px 10px', borderRadius: 999, background: `${color}20`, color, textAlign: 'center' }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
