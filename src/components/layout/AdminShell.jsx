import { useNavigate } from 'react-router-dom';
import { D } from '../../tokens.js';
import { UMLogo } from '../shared/Logo.jsx';

export function AdminShell({ active, children }) {
  const navigate = useNavigate();
  const nav = [
    ['Overview', 'overview', '/admin'],
    ['Orders', 'orders', '/admin/orders'],
    ['Quotes', 'quotes', '/admin/quotes'],
    ['Inventory', 'inventory', '/admin/inventory'],
    ['Customers', 'customers', '/admin/customers'],
    ['Vendors', 'vendors', '/admin/vendors'],
    ['CMS', 'cms', '/admin/cms'],
    ['Analytics', 'analytics', '/admin/analytics'],
    ['Settings', 'settings', '/admin/settings'],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh', background: D.paper, fontFamily: D.sans, color: D.ink }}>
      <div style={{ background: D.ink, color: D.paper, padding: '22px 18px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <UMLogo size={22} color={D.paper} weight={600} />
        </div>
        <div style={{ fontFamily: D.mono, fontSize: 10, letterSpacing: 1.2, color: D.plumSoft, marginTop: 6 }}>ADMIN CONSOLE</div>
        <div style={{ marginTop: 24 }}>
          {nav.map(([label, id, path]) => (
            <div key={id} onClick={() => navigate(path)} style={{
              padding: '9px 12px', borderRadius: 6, fontSize: 13,
              background: active === id ? D.plum : 'transparent',
              color: active === id ? D.paper : '#b9a8bc',
              marginBottom: 2, cursor: 'pointer',
            }}>{label}</div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 14, background: 'rgba(255,255,255,.06)', borderRadius: 10 }}>
          <div style={{ fontFamily: D.mono, fontSize: 9, letterSpacing: 1, color: D.plumSoft }}>LOGGED IN AS</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Damon Reed</div>
          <div style={{ fontSize: 11, color: '#9d8e9f' }}>Super admin</div>
        </div>
      </div>
      <div style={{ overflowY: 'auto' }}>{children}</div>
    </div>
  );
}
