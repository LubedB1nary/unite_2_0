import { Link, useLocation, useNavigate } from 'react-router-dom';
import { D } from '../../tokens.js';
import { UMLogo } from '../shared/Logo.jsx';
import { auth } from '../../lib/auth.js';

const NAV = [
  ['Overview', 'overview', '/admin'],
  ['Orders', 'orders', '/admin/orders'],
  ['Quotes', 'quotes', '/admin/quotes'],
  ['Inventory', 'inventory', '/admin/inventory'],
  ['Customers', 'customers', '/admin/customers'],
  ['CRM', 'crm', '/admin/crm'],
  ['Vendors', 'vendors', '/admin/vendors'],
  ['CMS', 'cms', '/admin/cms'],
  ['Analytics', 'analytics', '/admin/analytics'],
];

export function AdminShell({ active, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const session = auth.use();

  const isActive = (id, path) => active === id || location.pathname === path;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh', background: D.paper, fontFamily: D.sans, color: D.ink }}>
      <aside aria-label="Admin navigation" style={{ background: D.ink, color: D.paper, padding: '22px 18px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <Link to="/" aria-label="Unite Medical home">
          <UMLogo size={22} color={D.paper} weight={600} />
        </Link>
        <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1.2, color: D.plumSoft, marginTop: 6 }}>ADMIN CONSOLE</div>
        <nav style={{ marginTop: 24 }}>
          {NAV.map(([label, id, path]) => (
            <Link key={id} to={path} style={{
              display: 'block',
              padding: '9px 12px', borderRadius: 6, fontSize: 13,
              background: isActive(id, path) ? D.plum : 'transparent',
              color: isActive(id, path) ? D.paper : '#b9a8bc',
              marginBottom: 2,
            }}>{label}</Link>
          ))}
        </nav>
        <div style={{ marginTop: 40, padding: 14, background: 'rgba(255,255,255,.06)', borderRadius: 10 }}>
          <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, color: D.plumSoft }}>LOGGED IN AS</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>{session?.name || 'Damon Reed'}</div>
          <div style={{ fontSize: 11, color: '#9d8e9f' }}>{session?.role === 'admin' ? 'Super admin' : session ? 'Customer' : 'Demo · sign in'}</div>
          {session ? (
            <button onClick={() => { auth.logout(); navigate('/'); }} style={{ marginTop: 10, fontSize: 11, fontFamily: D.mono, letterSpacing: 1, color: D.plumSoft, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>SIGN OUT</button>
          ) : (
            <button onClick={() => navigate('/login')} style={{ marginTop: 10, fontSize: 11, fontFamily: D.mono, letterSpacing: 1, color: D.plumSoft, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>SIGN IN</button>
          )}
        </div>
      </aside>
      <div style={{ overflowY: 'auto' }}>{children}</div>
    </div>
  );
}
