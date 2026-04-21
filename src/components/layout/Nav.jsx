import { Link, useLocation, useNavigate } from 'react-router-dom';
import { D } from '../../tokens.js';
import { UMLogo } from '../shared/Logo.jsx';
import { Icon } from '../shared/Icon.jsx';
import { useCart } from '../../store/cart.js';

const LINKS = [
  ['/catalog', 'Catalog'],
  ['/solutions', 'Solutions'],
  ['/services', 'Services'],
  ['/quote', 'Quoting Engine'],
  ['/resources', 'Resources'],
];

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCart();
  const cartCount = cart.items.reduce((a, b) => a + b.qty, 0);

  const isActive = (path) => {
    if (path === '/catalog') return location.pathname.startsWith('/catalog') || location.pathname.startsWith('/products');
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header style={{ background: D.paper, borderBottom: `1px solid ${D.line}`, position: 'sticky', top: 0, zIndex: 20 }}>
      <div style={{ background: D.ink, color: D.paper, fontFamily: D.mono, fontSize: 11, letterSpacing: 0.8 }}>
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '7px 40px', display: 'flex', gap: 24, alignItems: 'center' }}>
          <span>FDA · 3015727296</span>
          <span style={{ opacity: .4 }}>/</span>
          <span>MSPV BPA · 36C24123A0077</span>
          <span style={{ opacity: .4 }}>/</span>
          <span>Veteran-Owned · Lithia Springs, GA</span>
          <span style={{ flex: 1 }} />
          <a href="tel:+16785550142" style={{ opacity: .7, color: 'inherit' }}>Sales · (678) 555-0142</a>
        </div>
      </div>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '18px 40px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 48 }}>
        <Link to="/" aria-label="Unite Medical home" style={{ display: 'inline-flex' }}>
          <UMLogo size={30} color={D.ink} weight={600} />
        </Link>
        <nav aria-label="Primary" style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
          {LINKS.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              aria-current={isActive(path) ? 'page' : undefined}
              style={{
                background: isActive(path) ? D.plum : 'transparent',
                color: isActive(path) ? D.paper : D.ink2,
                padding: '9px 18px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: isActive(path) ? 600 : 500,
                fontFamily: D.sans,
                transition: 'background .15s, color .15s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => navigate('/catalog')}
            aria-label="Search catalog"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: `1px solid ${D.line}`, borderRadius: 999, color: D.ink3, fontSize: 13, width: 220, background: D.card, cursor: 'pointer' }}
          >
            <Icon.search /> <span>Search 12,400 SKUs</span>
          </button>
          <Link to="/login" style={{ background: 'none', color: D.ink, fontFamily: D.sans, fontSize: 13 }}>Sign in</Link>
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: 7, background: D.ink, color: D.paper, padding: '10px 16px', borderRadius: 999, fontSize: 13, fontFamily: D.sans }}>
            <Icon.cart /> {cartCount ? `Cart · ${cartCount}` : 'Cart'}
          </Link>
        </div>
      </div>
    </header>
  );
}
