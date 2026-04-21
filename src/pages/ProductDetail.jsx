import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { D } from '../tokens.js';
import { Nav } from '../components/layout/Nav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { PhotoPlaceholder } from '../components/shared/PhotoPlaceholder.jsx';
import { Icon } from '../components/shared/Icon.jsx';
import { Lightbox } from '../components/shared/Lightbox.jsx';
import { cartStore } from '../store/cart.js';
import { db } from '../lib/db.js';
import { fmt } from '../lib/format.js';
import { useViewport } from '../lib/viewport.js';
import { PRODUCT_IMG, productThumbs } from '../lib/imageMap.js';

function tierForQty(qty) {
  if (qty >= 250) return '250+';
  if (qty >= 50) return '50-249';
  if (qty >= 10) return '10-49';
  return '1-9';
}

export function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;
  const product = db.useRow('products', id);
  const inv = db.useTable('inventory', { where: { sku: id } });
  const stock = inv.reduce((a, b) => a + b.on_hand, 0);
  const tiers = useMemo(() => db.list('pricing', { where: { sku: id }, orderBy: 'min_qty' }), [id]);
  const [qty, setQty] = useState(1);
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const tierLabel = tierForQty(qty);
  const activeTier = tiers.slice().reverse().find((t) => qty >= t.min_qty) || tiers[0];

  const gallery = useMemo(() => {
    const heroSrc = PRODUCT_IMG[id];
    const thumbs = productThumbs(id);
    const items = [];
    if (heroSrc) items.push({ src: heroSrc, alt: product?.name || '', label: 'Hero' });
    if (thumbs) {
      ['front', 'back', 'detail', 'packaging'].forEach((angle) => {
        items.push({
          src: thumbs[angle],
          alt: `${product?.name || ''} — ${angle}`,
          label: angle,
        });
      });
    }
    return items;
  }, [id, product?.name]);

  if (!product) {
    return (
      <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
        <Nav />
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: D.display, fontSize: 56, fontWeight: 400, letterSpacing: -1.2, lineHeight: 1, margin: 0 }}>Product not found.</h1>
          <button onClick={() => navigate('/catalog')} style={{ marginTop: 16, background: D.plum, color: D.paper, border: 'none', padding: '13px 22px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Back to catalog</button>
        </main>
      </div>
    );
  }

  const price = activeTier?.unit_price ?? product.price;

  return (
    <div style={{ background: D.paper, fontFamily: D.sans, color: D.ink, minHeight: '100vh' }}>
      <Nav />
      <main id="main">
        <nav aria-label="Breadcrumb" style={{ padding: `14px ${padX}px`, background: D.paperAlt, borderBottom: `1px solid ${D.line}`, fontFamily: D.mono, fontSize: 11, letterSpacing: 0.8, color: D.ink3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <div style={{ maxWidth: 1360, margin: '0 auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Catalog / {product.category} / <span style={{ color: D.ink }}>{product.name}</span>
          </div>
        </nav>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: `${isMobile ? 28 : 40}px ${padX}px ${isMobile ? 56 : 80}px`, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: isMobile ? 28 : 56 }}>
          <div>
            <button
              onClick={() => gallery.length && setLightboxIdx(0)}
              aria-label={`Open ${product.name} gallery (${gallery.length} images)`}
              disabled={gallery.length === 0}
              style={{
                position: 'relative',
                display: 'block',
                width: '100%',
                padding: 0,
                background: 'transparent',
                border: 'none',
                cursor: gallery.length ? 'zoom-in' : 'default',
              }}
            >
              <PhotoPlaceholder
                src={PRODUCT_IMG[product.sku]}
                caption={product.img}
                alt={product.name}
                height={isMobile ? 320 : 560}
                stripeFrom="#ebe3d3"
                stripeTo="#ddd1b7"
                textColor={D.plum}
              />
              {gallery.length > 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    right: 14,
                    background: 'rgba(36, 26, 40, 0.78)',
                    color: D.paper,
                    fontFamily: D.mono,
                    fontSize: 11,
                    letterSpacing: 1.2,
                    padding: '6px 12px',
                    borderRadius: 999,
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  + {gallery.length - 1} VIEWS
                </span>
              )}
            </button>
          </div>
          <div>
            <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum }}>
              {product.sku} {product.hcpcs && product.hcpcs !== '—' ? `· HCPCS ${product.hcpcs}` : ''} {product.pdac_approved ? '· PDAC APPROVED' : ''}
            </div>
            <h1 style={{ fontFamily: D.display, fontSize: 'clamp(30px, 5.4vw, 48px)', fontWeight: 400, letterSpacing: -1, lineHeight: 1.08, margin: '14px 0 0' }}>{product.name}</h1>
            <div style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'center', color: D.plum }}>
              {[0, 1, 2, 3, 4].map((i) => <Icon.star key={i} />)}
              <div style={{ fontSize: 13, color: D.ink2, marginLeft: 10 }}>4.8 · 142 reviews · {db.count('orders')} orders this month</div>
            </div>
            <div style={{ marginTop: 28, padding: 24, background: D.card, borderRadius: 14, border: `1px solid ${D.line}` }}>
              <div style={{ display: 'flex', alignItems: 'end', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: D.display, fontSize: isMobile ? 42 : 56, color: D.plum, letterSpacing: -1, lineHeight: 1 }}>{fmt.money(price)}</div>
                <div style={{ color: D.ink3, fontSize: 13, paddingBottom: 8 }}>per unit · volume tier {tierLabel}</div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1, color: D.ink3, marginBottom: 10 }}>VOLUME TIER</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {tiers.map((t) => {
                    const isActive = activeTier?.id === t.id;
                    const range = t.min_qty >= 250 ? '250+' : t.min_qty >= 50 ? '50-249' : t.min_qty >= 10 ? '10-49' : '1-9';
                    return (
                      <button key={t.id} onClick={() => setQty(t.min_qty)} style={{
                        flex: 1, padding: '12px 8px', borderRadius: 10,
                        background: isActive ? D.plum : D.paper,
                        color: isActive ? D.paper : D.ink,
                        border: `1px solid ${isActive ? D.plum : D.line}`,
                        cursor: 'pointer', fontFamily: D.sans,
                      }}>
                        <div style={{ fontSize: 12, opacity: .7 }}>{range}</div>
                        <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{fmt.money(t.unit_price)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 22, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, border: `1px solid ${D.line}`, borderRadius: 999, padding: 4 }}>
                  <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer' }}><Icon.minus /></button>
                  <div style={{ minWidth: 40, textAlign: 'center', fontWeight: 600 }}>{qty}</div>
                  <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer' }}><Icon.plus /></button>
                </div>
                <button onClick={() => { cartStore.add(product.sku, qty); navigate('/cart'); }} style={{ flex: '1 1 160px', background: D.ink, color: D.paper, border: 'none', padding: '14px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Add to cart</button>
                <button onClick={() => navigate('/quote')} style={{ background: 'transparent', color: D.ink, border: `1.5px solid ${D.ink}`, padding: '13px 18px', borderRadius: 999, cursor: 'pointer', fontSize: 14, flex: isMobile ? '1 1 160px' : '0 0 auto' }}>Request quote</button>
              </div>
            </div>
            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 12 }}>
              {[['In stock', `${stock.toLocaleString()} units`], ['Ships today', 'if ordered 3PM ET'], ['Free freight', 'orders $500+']].map(([a, b], i) => (
                <div key={i} style={{ border: `1px solid ${D.line}`, padding: 14, borderRadius: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: D.ink }}>{a}</div>
                  <div style={{ fontSize: 12, color: D.ink2, marginTop: 4 }}>{b}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <h2 style={{ fontFamily: D.display, fontSize: 22, marginBottom: 12 }}>Specifications</h2>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['HCPCS', product.hcpcs || '—'],
                    ['PDAC approved', product.pdac_approved ? 'Yes — letter available' : 'No'],
                    ['Pack size', product.pack_size],
                    ['MOQ', String(product.moq)],
                    ['Country of origin', product.country_of_origin],
                    ['TAA compliant', product.taa_compliant ? 'Yes' : 'No'],
                    ['Berry compliant', product.berry_compliant ? 'Yes' : 'No'],
                    ['MSPV listed', product.mspv_listed ? 'Yes' : 'No'],
                    ['HTS code', product.hts_code],
                  ].map(([k, v], i) => (
                    <tr key={k} style={{ borderTop: i === 0 ? 'none' : `1px solid ${D.line}` }}>
                      <td style={{ padding: '12px 0', color: D.ink2, width: '40%', fontFamily: D.mono, fontSize: 12, letterSpacing: 0.6 }}>{k.toUpperCase()}</td>
                      <td style={{ padding: '12px 0', color: D.ink, fontWeight: 500 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Lightbox
        open={lightboxIdx >= 0}
        startIndex={Math.max(0, lightboxIdx)}
        images={gallery}
        onClose={() => setLightboxIdx(-1)}
      />
    </div>
  );
}
