import { useSyncExternalStore } from 'react';
import { db } from './db.js';
import { uid, delay } from './format.js';

const SESSION_KEY = 'um.session.v1';

let session = (() => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const subs = new Set();
const notify = () => {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) { void e; }
  if (!session) try { localStorage.removeItem(SESSION_KEY); } catch (e) { void e; }
  subs.forEach((fn) => fn());
};

export const auth = {
  current() { return session; },

  async login(email, password) {
    await delay(180, 360);
    const user = db.list('profiles', { where: { email: email.toLowerCase().trim() } })[0];
    if (!user) throw new Error('No account with that email.');
    if (user.password !== password) throw new Error('Wrong password.');
    session = { user_id: user.id, email: user.email, name: user.name, role: user.role, org_id: user.org_id };
    notify();
    return session;
  },

  async register({ email, password, name, org_name, segment }) {
    await delay(220, 480);
    const existing = db.list('profiles', { where: { email: email.toLowerCase().trim() } })[0];
    if (existing) throw new Error('An account with that email already exists.');
    const orgId = uid('org');
    db.insert('organizations', { id: orgId, name: org_name || `${name}'s organization`, segment: segment || 'asc', tier: 'C', terms: 'card', credit_limit: 0, total_spend: 0, account_rep: 'Aidan Park' });
    const userId = uid('usr');
    db.insert('profiles', { id: userId, email: email.toLowerCase().trim(), password, name, role: 'customer', org_id: orgId, title: 'Account owner' });
    session = { user_id: userId, email, name, role: 'customer', org_id: orgId };
    notify();
    return session;
  },

  logout() {
    session = null;
    notify();
  },

  /** Reactive React hook. */
  use() {
    const subscribe = (cb) => { subs.add(cb); return () => subs.delete(cb); };
    const getSnapshot = () => session ? `${session.user_id}:${session.role}` : 'anon';
    useSyncExternalStore(subscribe, getSnapshot);
    return session;
  },

  org() {
    if (!session?.org_id) return null;
    return db.get('organizations', session.org_id);
  },
};
