import { D } from '../../tokens.js';
import { useViewport } from '../../lib/viewport.js';

export function PageHead({ eyebrow, title, sub, right }) {
  const { isMobile } = useViewport();
  const padX = isMobile ? 20 : 40;

  return (
    <div style={{ padding: `${isMobile ? 44 : 72}px ${padX}px ${isMobile ? 24 : 32}px`, background: D.paper }}>
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: right && !isMobile ? '1.4fr 1fr' : '1fr',
          gap: isMobile ? 28 : 56,
          alignItems: 'end',
        }}
      >
        <div>
          <div style={{ fontFamily: D.mono, fontSize: 11, letterSpacing: 1.4, color: D.plum, marginBottom: isMobile ? 14 : 22 }}>{eyebrow}</div>
          <h1
            style={{
              fontFamily: D.display,
              fontSize: 'clamp(40px, 9vw, 92px)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: 'clamp(-1.1px, -0.25vw, -2.3px)',
              margin: 0,
            }}
          >
            {title}
          </h1>
          {sub && (
            <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.55, color: D.ink2, marginTop: isMobile ? 14 : 22, maxWidth: 600, marginBottom: 0 }}>
              {sub}
            </p>
          )}
        </div>
        {right}
      </div>
    </div>
  );
}
