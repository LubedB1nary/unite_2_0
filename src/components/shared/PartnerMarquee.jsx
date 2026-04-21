import { D } from '../../tokens.js';

const DEFAULT_PARTNERS = [
  'VA HEALTH',
  'CVS',
  'GOPUFF',
  'AMAZON',
  'PUBLIX',
  'DEPT. OF VETERAN AFFAIRS',
  'KAISER',
  'ASCOA',
  'SURGERY PARTNERS',
  'WALGREENS',
  'HCA HEALTHCARE',
];

export function PartnerMarquee({
  items = DEFAULT_PARTNERS,
  background = D.paperAlt,
  borderColor = D.line,
  textColor = D.ink2,
  eyebrow = 'TRUSTED BY THE FRONT LINE',
  reverse = false,
  speed = 'normal',
  showEyebrow = true,
}) {
  const speedClass = speed === 'slow' ? ' um-marquee--slow' : '';
  const dirClass = reverse ? ' um-marquee--reverse' : '';
  const doubled = [...items, ...items];

  return (
    <section
      aria-label="Partners and customers"
      style={{
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        background,
        padding: showEyebrow ? '20px 0 22px' : '22px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {showEyebrow && (
        <div
          style={{
            maxWidth: 1360,
            margin: '0 auto',
            padding: '0 40px 14px',
            fontFamily: D.mono,
            fontSize: 11,
            letterSpacing: 1.4,
            color: D.plum,
          }}
        >
          {eyebrow}
        </div>
      )}
      <div
        className="um-marquee-pause"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div
          className={`um-marquee${dirClass}${speedClass}`}
          style={{
            gap: 80,
            whiteSpace: 'nowrap',
            fontFamily: D.mono,
            fontSize: 13,
            letterSpacing: 3,
            color: textColor,
            paddingRight: 80,
          }}
        >
          {doubled.map((p, i) => (
            <span
              key={i}
              aria-hidden={i >= items.length}
              style={{ display: 'inline-block' }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
