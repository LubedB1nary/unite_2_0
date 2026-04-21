import { useNavigate, useLocation } from 'react-router-dom';
import { D } from '../../tokens.js';
import { UMLogo } from '../shared/Logo.jsx';
import { Icon } from '../shared/Icon.jsx';
import { useCart } from '../../store/cart.js';

export function Nav({ active }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCart();
  const cartCount = cart.items.reduce((a, b) => a + b.qty, 0);

  const links = [
    ['/', 'Catalog'],
    ['/solutions', 'Solutions'],
    ['/services', 'Services'],
    ['/quote', 'Quoting Engine'],
    ['/resources', 'Resources'],
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname.startsWith('/catalog') || location.pathname.startsWith('/products');
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ background: D.paper, borderBottom: `1px solid ${D.line}`, position: 'sticky', top: 0, zIndex: 20 }}>
      <div style={{ background: D.ink, color: D.paper, fontFamily: D.mono, fontSize: 11, letterSpacing: 0.8 }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '7px 40px', display: 'flex', gap: 24, alignItems: 'center' }}>
          <span>FDA · 3015727296</span>
          <span style={{ opacity: .4 }}>/</span>
          <span>MSPV BPA · 36C24123A0077</span>
          <span style={{ opacity: .4 }}>/</span>
          <span>Veteran-Owned · Lithia Springs, GA</span>
          <span style={{ flex: 1 }} />
          <span style={{ opacity: .7 }}>Sales · (678) 555-0142</span>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '18px 40px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 48 }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <UMLogo size={30} color={D.ink} weight={600} />
        </div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
          {links.map(([path, label]) => (
            <button key={path} onClick={() => navigate(path)} style={{
              background: isActive(path) ? D.plum : 'transparent',
              color: isActive(path) ? D.paper : D.ink2,
              border: 'none', cursor: 'pointer',
              padding: '9px 18px', borderRadius: 999,
              fontSize: 14, fontWeight: isActive(path) ? 600 : 500, fontFamily: D.sans,
            }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: `1px solid ${D.line}`, borderRadius: 999, color: D.ink3, fontSize: 13, width: 220, background: D.card }}>
            <Icon.search /> <span>Search 12,400 SKUs</span>
          </div>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: D.ink, fontFamily: D.sans, fontSize: 13, cursor: 'pointer' }}>Sign in</button>
          <button onClick={() => navigate('/cart')} style={{ display: 'flex', alignItems: 'center', gap: 7, background: D.ink, color: D.paper, border: 'none', padding: '10px 16px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontFamily: D.sans }}>
            <Icon.cart /> {cartCount ? `Cart · ${cartCount}` : 'Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
