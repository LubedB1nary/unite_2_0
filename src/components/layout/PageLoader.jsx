import { D } from '../../tokens.js';

export function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: D.paper,
        fontFamily: D.mono,
        fontSize: 11,
        letterSpacing: 1.4,
        color: D.ink3,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <span
          aria-hidden="true"
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            background: D.plum,
            animation: 'umPulse 1.1s ease-in-out infinite',
          }}
        />
        LOADING
      </span>
    </div>
  );
}
