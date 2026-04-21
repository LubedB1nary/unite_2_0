export const PRODUCTS = [
  { sku: 'UM-ORTH-0412', name: 'PDAC-Approved Knee Brace · L-1832', cat: 'Orthotics', packSize: '1 ea', price: 89.40, tier: 'Bracing', hcpcs: 'L1832', moq: 1, stock: 482, img: 'knee brace, side view' },
  { sku: 'UM-DIAG-0077', name: 'COVID · Flu A/B · RSV · 3-in-1 Test', cat: 'Diagnostics', packSize: '25 ct', price: 142.00, tier: 'POC', hcpcs: '—', moq: 10, stock: 3120, img: 'test cassette on tray' },
  { sku: 'UM-PPE-1108', name: 'Nitrile Exam Gloves · Chemo-Rated', cat: 'PPE', packSize: '100 ct', price: 11.25, tier: 'Consumable', hcpcs: 'A4927', moq: 20, stock: 18430, img: 'gloves, open box' },
  { sku: 'UM-WND-0231', name: 'Hydrocolloid Dressing · 4×4', cat: 'Wound Care', packSize: '10 ct', price: 24.80, tier: 'Consumable', hcpcs: 'A6234', moq: 1, stock: 940, img: 'wound dressing packet' },
  { sku: 'UM-IV-5510', name: '0.9% Sodium Chloride · 1000mL', cat: 'Pharmaceuticals', packSize: '12 ct', price: 58.00, tier: 'Pharma', hcpcs: '—', moq: 2, stock: 612, img: 'iv saline bags' },
  { sku: 'UM-ORTH-0556', name: 'Walker Boot · Pneumatic · Tall', cat: 'Orthotics', packSize: '1 ea', price: 72.50, tier: 'Bracing', hcpcs: 'L4361', moq: 1, stock: 288, img: 'walker boot, 3/4' },
  { sku: 'UM-DIAG-0240', name: 'Multi-Drug Surface Test · 12-panel', cat: 'Diagnostics', packSize: '50 ct', price: 340.00, tier: 'POC', hcpcs: '—', moq: 5, stock: 820, img: 'test strip panel' },
  { sku: 'UM-CAP-9901', name: 'Pulse Oximeter · Clinical Grade', cat: 'Equipment', packSize: '1 ea', price: 58.00, tier: 'Equipment', hcpcs: 'E0445', moq: 1, stock: 212, img: 'pulse ox on finger' },
];

export const SEGMENTS = [
  { id: 'asc', title: 'Ambulatory Surgery Centers', line: 'Procedure-specific bundles. No MOQs.', tam: '$45.6B', stat: '21% growth · 2029' },
  { id: 'gov', title: 'Government & VA', line: 'MSPV BPA · Veteran-owned · Berry compliant.', tam: '$5–10B', stat: 'CAGE 8MK70' },
  { id: 'pharma', title: 'Independent Pharmacies', line: 'Private-label diagnostics + Clyne telehealth.', tam: '$15–20B', stat: 'Drop-ship ready' },
  { id: 'dist', title: 'Regional Distributors', line: 'FDA-registered import. White-label. Drop-ship.', tam: '$10–15B', stat: 'FDA #3015727296' },
];

export const TRUST_METRICS = [
  { big: '500M+', small: 'items distributed' },
  { big: '36C24123A0077', small: 'MSPV BPA (VA)' },
  { big: '3015727296', small: 'FDA registration' },
  { big: '48 hr', small: 'median ship to ASC' },
];
