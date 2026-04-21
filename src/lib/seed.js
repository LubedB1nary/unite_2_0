/* Seeded fixture data for the in-browser DB.
   Designed to match the brief's table shapes (Section 7) closely enough
   that a future migration to Supabase is mostly mechanical.            */

const isoDaysAgo = (d) => new Date(Date.now() - d * 86400000).toISOString();

const STATIC_PRODUCTS = [
  { sku: 'UM-ORTH-0412', name: 'PDAC-Approved Knee Brace · L-1832', cat: 'Orthotics', packSize: '1 ea', price: 89.40, tier: 'Bracing', hcpcs: 'L1832', moq: 1, stock: 482, img: 'knee brace, side view', cogs: 31.30 },
  { sku: 'UM-DIAG-0077', name: 'COVID · Flu A/B · RSV · 3-in-1 Test', cat: 'Diagnostics', packSize: '25 ct', price: 142.00, tier: 'POC', hcpcs: '—', moq: 10, stock: 3120, img: 'test cassette on tray', cogs: 49.00 },
  { sku: 'UM-PPE-1108', name: 'Nitrile Exam Gloves · Chemo-Rated', cat: 'PPE', packSize: '100 ct', price: 11.25, tier: 'Consumable', hcpcs: 'A4927', moq: 20, stock: 18430, img: 'gloves, open box', cogs: 4.10 },
  { sku: 'UM-WND-0231', name: 'Hydrocolloid Dressing · 4×4', cat: 'Wound Care', packSize: '10 ct', price: 24.80, tier: 'Consumable', hcpcs: 'A6234', moq: 1, stock: 940, img: 'wound dressing packet', cogs: 8.60 },
  { sku: 'UM-IV-5510', name: '0.9% Sodium Chloride · 1000mL', cat: 'Pharmaceuticals', packSize: '12 ct', price: 58.00, tier: 'Pharma', hcpcs: '—', moq: 2, stock: 612, img: 'iv saline bags', cogs: 21.00 },
  { sku: 'UM-ORTH-0556', name: 'Walker Boot · Pneumatic · Tall', cat: 'Orthotics', packSize: '1 ea', price: 72.50, tier: 'Bracing', hcpcs: 'L4361', moq: 1, stock: 288, img: 'walker boot, 3/4', cogs: 25.00 },
  { sku: 'UM-DIAG-0240', name: 'Multi-Drug Surface Test · 12-panel', cat: 'Diagnostics', packSize: '50 ct', price: 340.00, tier: 'POC', hcpcs: '—', moq: 5, stock: 820, img: 'test strip panel', cogs: 118.00 },
  { sku: 'UM-CAP-9901', name: 'Pulse Oximeter · Clinical Grade', cat: 'Equipment', packSize: '1 ea', price: 58.00, tier: 'Equipment', hcpcs: 'E0445', moq: 1, stock: 212, img: 'pulse ox on finger', cogs: 19.20 },
  { sku: 'UM-ORTH-0701', name: 'Wrist-Hand Orthosis · Universal', cat: 'Orthotics', packSize: '1 ea', price: 62.40, tier: 'Bracing', hcpcs: 'L3908', moq: 1, stock: 392, img: 'wrist orthosis', cogs: 22.10 },
  { sku: 'UM-PPE-1209', name: 'Surgical Mask · Level 3 · Tie-On', cat: 'PPE', packSize: '50 ct', price: 9.20, tier: 'Consumable', hcpcs: 'A4928', moq: 12, stock: 24800, img: 'surgical mask box', cogs: 3.40 },
  { sku: 'UM-WND-0455', name: 'Silicone Foam Border · 6×6', cat: 'Wound Care', packSize: '10 ct', price: 64.00, tier: 'Consumable', hcpcs: 'A6212', moq: 1, stock: 612, img: 'silicone foam bordered', cogs: 22.40 },
  { sku: 'UM-CAP-7720', name: 'Tabletop Autoclave · 12L', cat: 'Equipment', packSize: '1 ea', price: 1840.00, tier: 'Equipment', hcpcs: 'E1399', moq: 1, stock: 18, img: 'tabletop autoclave', cogs: 720.00 },
  { sku: 'UM-IV-5621', name: 'Lactated Ringer\'s · 1000mL', cat: 'Pharmaceuticals', packSize: '12 ct', price: 64.00, tier: 'Pharma', hcpcs: '—', moq: 2, stock: 408, img: 'lactated ringers bag', cogs: 24.00 },
  { sku: 'UM-DIAG-0341', name: 'A1c Hemoglobin Test · POC', cat: 'Diagnostics', packSize: '20 ct', price: 184.00, tier: 'POC', hcpcs: '—', moq: 4, stock: 226, img: 'a1c reader strip', cogs: 64.50 },
  { sku: 'UM-ORTH-0892', name: 'Cervical Collar · Adjustable', cat: 'Orthotics', packSize: '1 ea', price: 31.20, tier: 'Bracing', hcpcs: 'L0180', moq: 1, stock: 540, img: 'cervical collar foam', cogs: 11.20 },
  { sku: 'UM-PPE-1350', name: 'Isolation Gown · AAMI Level 3', cat: 'PPE', packSize: '10 ct', price: 38.00, tier: 'Consumable', hcpcs: '—', moq: 4, stock: 1680, img: 'isolation gown packed', cogs: 13.50 },
];

const STATIC_CATEGORIES = [
  { slug: 'orthotics', name: 'Orthotics', parent: null, count: 412 },
  { slug: 'diagnostics', name: 'Diagnostics', parent: null, count: 318 },
  { slug: 'ppe', name: 'PPE', parent: null, count: 612 },
  { slug: 'wound-care', name: 'Wound Care', parent: null, count: 244 },
  { slug: 'equipment', name: 'Equipment', parent: null, count: 188 },
  { slug: 'pharmaceuticals', name: 'Pharmaceuticals', parent: null, count: 96 },
  { slug: 'capital-equipment', name: 'Capital Equipment', parent: null, count: 42 },
  { slug: 'supplements', name: 'Supplements', parent: null, count: 124 },
];

const STATIC_WAREHOUSES = [
  { id: 'wh_atl', code: 'ATL', name: 'Atlanta, GA · main', city: 'Atlanta', state: 'GA', utilization: 0.74, capacity_units: 1_400_000, lat: 33.749, lng: -84.388 },
  { id: 'wh_reno', code: 'RNO', name: 'Reno, NV', city: 'Reno', state: 'NV', utilization: 0.52, capacity_units: 820_000, lat: 39.529, lng: -119.813 },
  { id: 'wh_dal', code: 'DAL', name: 'Dallas, TX', city: 'Dallas', state: 'TX', utilization: 0.61, capacity_units: 720_000, lat: 32.776, lng: -96.797 },
  { id: 'wh_lit', code: 'LIT', name: 'Lithia Springs · overflow', city: 'Lithia Springs', state: 'GA', utilization: 0.88, capacity_units: 280_000, lat: 33.794, lng: -84.665 },
];

const STATIC_ORGS = [
  { id: 'org_atlsurgical', name: 'Atlanta Surgical Center', segment: 'asc', tier: 'A', terms: 'net30', credit_limit: 60000, total_spend: 612400, account_rep: 'Meredith Cole' },
  { id: 'org_buckhead',   name: 'Buckhead ASC', segment: 'asc', tier: 'B', terms: 'net30', credit_limit: 30000, total_spend: 184200, account_rep: 'Meredith Cole' },
  { id: 'org_va_dublin',  name: 'VA Medical Center · Dublin', segment: 'gov', tier: 'A', terms: 'mspv', credit_limit: 250000, total_spend: 942100, account_rep: 'Damon Reed' },
  { id: 'org_holloway',   name: 'Holloway Apothecary', segment: 'pharmacy', tier: 'B', terms: 'card', credit_limit: 12000, total_spend: 84200, account_rep: 'Aidan Park' },
  { id: 'org_cobbems',    name: 'Cobb County EMS', segment: 'ems', tier: 'B', terms: 'net30', credit_limit: 25000, total_spend: 142800, account_rep: 'Terrell Jenkins' },
  { id: 'org_medone',     name: 'MedOne Distributors', segment: 'distributors', tier: 'A', terms: 'net60', credit_limit: 200000, total_spend: 1402900, account_rep: 'Damon Reed' },
  { id: 'org_walgreens',  name: 'Walgreens #2184', segment: 'pharmacy', tier: 'B', terms: 'card', credit_limit: 8000, total_spend: 24800, account_rep: 'Aidan Park' },
  { id: 'org_lonestar',   name: 'Lone Star DME', segment: 'distributors', tier: 'B', terms: 'net30', credit_limit: 60000, total_spend: 312800, account_rep: 'Aidan Park' },
];

const STATIC_PROFILES = [
  { id: 'usr_demo',     email: 'sarah@atlanta-surgical.com', password: 'demo', name: 'Sarah Chen', role: 'customer', org_id: 'org_atlsurgical', title: 'Materials Director' },
  { id: 'usr_kareem',   email: 'kareem@holloway.com', password: 'demo', name: 'Kareem Holloway', role: 'customer', org_id: 'org_holloway', title: 'Owner, PharmD' },
  { id: 'usr_admin',    email: 'damon@unitemedical.com', password: 'admin', name: 'Damon Reed', role: 'admin', org_id: null, title: 'Founder & CEO' },
  { id: 'usr_ops',      email: 'ops@unitemedical.com', password: 'admin', name: 'Miguel Vasquez', role: 'admin', org_id: null, title: 'Ops Lead' },
];

const STATIC_ADDRESSES = [
  { id: 'adr_1', org_id: 'org_atlsurgical', label: 'Atlanta Surgical Center · Main', line1: '3320 Piedmont Rd NE', city: 'Atlanta', state: 'GA', zip: '30305', is_default: true },
  { id: 'adr_2', org_id: 'org_atlsurgical', label: 'Buckhead Surgery · Dock B', line1: '4470 Lenox Ave', city: 'Atlanta', state: 'GA', zip: '30326', is_default: false },
  { id: 'adr_3', org_id: 'org_atlsurgical', label: 'Marietta ASC', line1: '1020 Windy Hill Rd', city: 'Marietta', state: 'GA', zip: '30080', is_default: false },
  { id: 'adr_4', org_id: 'org_holloway', label: 'Holloway Apothecary', line1: '110 Cherry St', city: 'Macon', state: 'GA', zip: '31201', is_default: true },
];

const SAMPLE_LEAD_NAMES = [
  ['Piedmont Health System', 'asc', 184000, 'warm', 'website'],
  ['Emory ASC', 'asc', 92000, 'warm', 'referral'],
  ['Northside Hospital', 'hospital', 412000, 'qualified', 'tradeshow'],
  ['VA Medical · Dublin', 'gov', 288000, 'qualified', 'mspv-listing'],
  ['Pinnacle ASC', 'asc', 8000, 'cold', 'cold-call'],
  ['MedSource Atlanta', 'distributors', 22000, 'cold', 'partner'],
  ['Southeast Pharmacy Co.', 'pharmacy', 14000, 'cold', 'website'],
  ['CVS Regional · GA', 'pharmacy', 38000, 'warm', 'partner'],
  ['Walgreens · 2184', 'pharmacy', 12000, 'warm', 'website'],
  ['Sunrise Outpatient', 'asc', 64000, 'hot', 'referral'],
];

const SAMPLE_BLOG_POSTS = [
  {
    slug: 'mckesson-medsurg-spinoff',
    title: 'McKesson is spinning off Med-Surg. What it means for ASCs.',
    excerpt: 'McKesson\'s May 2025 announcement opens a 12-24 month window. Here\'s how to use it without paying a switching tax.',
    author: 'Damon Reed',
    category: 'Procurement',
    cover: 'warehouse, dawn shift',
    body: `# McKesson's spinoff is your renegotiation window\n\nMcKesson announced intent to separate its Medical-Surgical Solutions business in May 2025. For the typical 4-OR ASC, that means a vendor change conversation that won't be punished by a contract renewal cycle...\n\nWe ran the numbers on 22 ASC accounts that switched in Q4 2025. The median fill-rate uplift was 6.4 points and the median price reduction was 11%.`,
    published: true,
    views: 3120,
    posted_at: isoDaysAgo(7),
  },
  {
    slug: 'asc-procedure-bundles-101',
    title: 'Procedure bundles 101: how to build a case cart that actually saves time',
    excerpt: 'A practical primer on bundling SKUs by CPT code, with examples from total knee, cataract, and shoulder arthroscopy.',
    author: 'Meredith Cole',
    category: 'ASCs',
    cover: 'OR turnover, late afternoon',
    body: `# Procedure bundles 101\n\nA case cart isn't a list — it's a workflow.\n\nWe build bundles around three principles:\n\n1. **Code-first**: Start with the CPT, work back to consumables.\n2. **MOQ-aware**: Don't bundle a 100-pack into a 6-OR center.\n3. **Surgeon-tunable**: Let the picker swap brands without breaking the bundle.\n\nThe rest is mostly logistics.`,
    published: true,
    views: 1880,
    posted_at: isoDaysAgo(14),
  },
  {
    slug: 'va-mspv-bpa-explained',
    title: 'The MSPV BPA, in plain English (no acronyms left behind)',
    excerpt: 'A reference for non-government buyers trying to understand how Unite ships to 170 VA medical centers.',
    author: 'Damon Reed',
    category: 'Government',
    cover: 'pallet of MSPV-tagged goods',
    body: `# The MSPV BPA explained\n\nMSPV stands for Medical Surgical Prime Vendor. The "BPA" is a Blanket Purchase Agreement — basically, a pre-negotiated catalog the VA can pull from without a fresh contract for every order...`,
    published: true,
    views: 920,
    posted_at: isoDaysAgo(28),
  },
  {
    slug: 'tariff-volatility-q2-2026',
    title: 'Tariff volatility, Q2 2026: a buyer\'s pricing memo',
    excerpt: 'Reciprocal duties on Section 301 categories shifted again in March. Here\'s what changed and how we\'re absorbing it.',
    author: 'Damon Reed',
    category: 'Procurement',
    cover: 'container yard at dawn',
    body: `# Tariff volatility, Q2 2026\n\nThe USITC dataset moved on March 18. For PPE under HTS 6307.90 the duty rate climbed 1.4 points; for orthotic devices the line was flat...`,
    published: true,
    views: 612,
    posted_at: isoDaysAgo(3),
  },
];

function buildSampleOrders() {
  const orgs = STATIC_ORGS;
  const products = STATIC_PRODUCTS;
  const out = { orders: [], items: [], shipments: [], invoices: [] };
  const statuses = ['delivered', 'in_transit', 'shipped', 'processing', 'pending'];
  const carriers = ['fedex_ground', 'ups_ground', 'usps_priority'];
  for (let i = 0; i < 36; i++) {
    const org = orgs[i % orgs.length];
    const itemCount = 1 + (i % 5);
    const lineItems = [];
    let subtotal = 0;
    for (let j = 0; j < itemCount; j++) {
      const p = products[(i * 3 + j) % products.length];
      const qty = ((i + j) % 6) + 1;
      const unit = p.price;
      const ext = +(qty * unit).toFixed(2);
      subtotal += ext;
      lineItems.push({ sku: p.sku, name: p.name, qty, unit_price: unit, ext_price: ext });
    }
    const freight = subtotal > 500 ? 0 : 42;
    const total = +(subtotal + freight).toFixed(2);
    const id = `UM-2026-${String(4800 - i).padStart(5, '0')}`;
    const placedAt = isoDaysAgo(i);
    const status = statuses[i % statuses.length];
    const order = {
      id,
      customer_id: org.id,
      customer_name: org.name,
      segment: org.segment,
      placed_by: 'usr_demo',
      placed_at: placedAt,
      created_at: placedAt,
      updated_at: placedAt,
      subtotal: +subtotal.toFixed(2),
      freight,
      tax: 0,
      total,
      payment_terms: org.terms,
      payment_status: status === 'delivered' ? 'paid' : status === 'pending' ? 'pending' : 'invoiced',
      status,
      ship_from_warehouse: ['wh_atl', 'wh_reno', 'wh_dal'][i % 3],
      ship_to_address_id: 'adr_1',
      tracking_number: status === 'pending' ? null : `1Z${(7920475 + i)}81234`,
      carrier: status === 'pending' ? null : carriers[i % 3],
      eta: new Date(Date.now() + (3 - (i % 6)) * 86400000).toISOString(),
    };
    out.orders.push(order);
    lineItems.forEach((li, idx) => out.items.push({ id: `${id}-li-${idx}`, order_id: id, ...li }));
    if (status !== 'pending') {
      out.shipments.push({
        id: `shp_${id}`,
        order_id: id,
        carrier: order.carrier,
        tracking_number: order.tracking_number,
        status: status === 'delivered' ? 'delivered' : status === 'in_transit' ? 'in_transit' : 'label_created',
        weight_lbs: 12 + (i % 80),
        cartons: 1 + (i % 4),
        eta: order.eta,
        warehouse_id: order.ship_from_warehouse,
        events: [
          { ts: placedAt, label: 'Label created (ShipStation)' },
          { ts: isoDaysAgo(Math.max(0, i - 1)), label: 'Picked up by carrier' },
          ...(status === 'delivered' ? [{ ts: isoDaysAgo(Math.max(0, i - 2)), label: 'Out for delivery' }, { ts: isoDaysAgo(Math.max(0, i - 2)), label: 'Delivered' }] : []),
        ],
      });
    }
    if (status !== 'pending') {
      out.invoices.push({
        id: `INV-${id.slice(3)}`,
        order_id: id,
        customer_id: org.id,
        amount: total,
        terms: org.terms,
        status: status === 'delivered' ? 'paid' : 'open',
        due_date: new Date(new Date(placedAt).getTime() + 30 * 86400000).toISOString(),
        qbo_id: `qbo_${id.toLowerCase()}`,
      });
    }
  }
  return out;
}

export function seed(db) {
  STATIC_PROFILES.forEach((p) => db.profiles.push({ ...p, created_at: isoDaysAgo(180) }));
  STATIC_ORGS.forEach((o) => db.organizations.push({ ...o, created_at: isoDaysAgo(380) }));
  STATIC_ADDRESSES.forEach((a) => db.addresses.push(a));
  STATIC_WAREHOUSES.forEach((w) => db.warehouses.push(w));
  STATIC_CATEGORIES.forEach((c) => db.categories.push({ id: c.slug, ...c }));

  STATIC_PRODUCTS.forEach((p) => {
    db.products.push({
      id: p.sku,
      sku: p.sku,
      name: p.name,
      category: p.cat,
      pack_size: p.packSize,
      price: p.price,
      cogs: p.cogs,
      tier: p.tier,
      hcpcs: p.hcpcs,
      moq: p.moq,
      img: p.img,
      country_of_origin: p.cat === 'Pharmaceuticals' ? 'US' : 'CN',
      taa_compliant: ['Orthotics', 'Equipment'].includes(p.cat),
      berry_compliant: p.cat === 'PPE',
      pdac_approved: p.hcpcs && p.hcpcs !== '—',
      mspv_listed: ['PPE', 'Wound Care', 'Pharmaceuticals'].includes(p.cat),
      fda_product_code: ['FRO', 'IMI', 'NHM', 'KGN'][Math.abs(p.sku.charCodeAt(8)) % 4],
      hts_code: ['9021.10', '3822.19', '4015.19', '3005.10', '3004.90'][Math.abs(p.sku.charCodeAt(7)) % 5],
    });

    db.inventory.push({ id: `inv_atl_${p.sku}`, sku: p.sku, warehouse_id: 'wh_atl', on_hand: p.stock, reorder_at: Math.floor(p.stock * 0.2), reorder_qty: Math.floor(p.stock * 0.5) });
    db.inventory.push({ id: `inv_reno_${p.sku}`, sku: p.sku, warehouse_id: 'wh_reno', on_hand: Math.floor(p.stock * 0.3), reorder_at: Math.floor(p.stock * 0.06), reorder_qty: Math.floor(p.stock * 0.15) });
    db.inventory.push({ id: `inv_dal_${p.sku}`, sku: p.sku, warehouse_id: 'wh_dal', on_hand: Math.floor(p.stock * 0.2), reorder_at: Math.floor(p.stock * 0.04), reorder_qty: Math.floor(p.stock * 0.1) });

    db.pricing.push({ id: `prc_${p.sku}_1`, sku: p.sku, tier: 1, min_qty: 1, unit_price: p.price });
    db.pricing.push({ id: `prc_${p.sku}_2`, sku: p.sku, tier: 2, min_qty: 50, unit_price: +(p.price * 0.93).toFixed(2) });
    db.pricing.push({ id: `prc_${p.sku}_3`, sku: p.sku, tier: 3, min_qty: 250, unit_price: +(p.price * 0.86).toFixed(2) });
  });

  const o = buildSampleOrders();
  o.orders.forEach((row) => db.orders.push(row));
  o.items.forEach((row) => db.order_items.push(row));
  o.shipments.forEach((row) => db.shipments.push(row));
  o.invoices.forEach((row) => db.invoices.push(row));

  SAMPLE_LEAD_NAMES.forEach(([name, segment, est_value, status, source], i) => {
    db.leads.push({
      id: `lead_${i + 1}`,
      org_name: name,
      segment,
      est_annual_value: est_value,
      status,
      source,
      owner: ['Meredith Cole', 'Aidan Park', 'Terrell Jenkins'][i % 3],
      created_at: isoDaysAgo(20 - i),
      next_action: ['Send pricing', 'Book follow-up', 'Send capability statement', 'Add to drip', 'Wait on PO'][i % 5],
      next_action_at: new Date(Date.now() + (i % 7) * 86400000).toISOString(),
      contact_name: ['Sarah Chen', 'Marcus Williams', 'Jennifer Rodriguez', 'David Thompson'][i % 4],
      contact_email: `lead${i + 1}@example.com`,
      hubspot_id: `hs_${100 + i}`,
    });
  });

  ['Damon Reed', 'Meredith Cole', 'Aidan Park', 'Terrell Jenkins', 'Miguel Vasquez'].forEach((name, i) => {
    db.activities.push({
      id: `act_${i + 1}`,
      kind: ['call', 'email', 'meeting', 'note', 'task'][i],
      who: name,
      subject: ['Discovery call · Piedmont Health', 'Follow-up · MedOne net 60 quote', 'Booked · VA Dublin procurement', 'Atlanta Surgical · shoulder tray', 'Outbound · Walgreens regional'][i],
      body: '',
      lead_id: `lead_${i + 1}`,
      org_id: STATIC_ORGS[i].id,
      created_at: isoDaysAgo(i),
    });
  });

  SAMPLE_BLOG_POSTS.forEach((b) => db.blog_posts.push({ id: b.slug, ...b }));

  db.cms_pages.push({ id: 'pg_about', slug: '/about', title: 'About', published: true, views: 18420, updated_at: isoDaysAgo(8) });
  db.cms_pages.push({ id: 'pg_services', slug: '/services', title: 'Services', published: true, views: 9120, updated_at: isoDaysAgo(11) });
  db.cms_pages.push({ id: 'pg_solutions', slug: '/solutions', title: 'Solutions', published: true, views: 4280, updated_at: isoDaysAgo(2) });
  db.cms_pages.push({ id: 'pg_compliance', slug: '/compliance', title: 'Compliance', published: true, views: 1620, updated_at: isoDaysAgo(2) });

  db.banners.push({ id: 'bn_1', placement: 'homepage_top', headline: 'McKesson Med-Surg switching window now open', cta_label: 'See our pitch', cta_url: '/blog/mckesson-medsurg-spinoff', active: true, starts_at: isoDaysAgo(7), ends_at: new Date(Date.now() + 60 * 86400000).toISOString(), clicks: 184 });

  db.vendors.push({ id: 'vnd_shanghai', name: 'Shanghai MedTech Co.', country: 'CN', status: 'approved', fda_registered: true, gs1_validated: true, last_audit: isoDaysAgo(45) });
  db.vendors.push({ id: 'vnd_taipei', name: 'Taipei Diagnostic Group', country: 'TW', status: 'pending', fda_registered: true, gs1_validated: false, last_audit: null });
  db.vendors.push({ id: 'vnd_atlpharma', name: 'Atlanta Pharma Co.', country: 'US', status: 'approved', fda_registered: true, gs1_validated: true, last_audit: isoDaysAgo(15) });

  // pre-seed a sample cart on the demo customer so the Cart page is interesting
  const demoCart = { id: 'cart_demo', customer_id: 'usr_demo', org_id: 'org_atlsurgical', updated_at: new Date().toISOString(), created_at: new Date().toISOString() };
  db.carts.push(demoCart);
  [['UM-ORTH-0412', 12], ['UM-PPE-1108', 40], ['UM-DIAG-0077', 20]].forEach(([sku, qty], i) => {
    const p = STATIC_PRODUCTS.find((x) => x.sku === sku);
    db.cart_items.push({ id: `ci_${i}`, cart_id: 'cart_demo', sku, qty, unit_price: p.price, name: p.name });
  });
}
