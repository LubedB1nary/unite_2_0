import { D } from '../../tokens.js';

export function Grad({ children, style = {} }) {
  return (
    <span style={{
      background: D.grad,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      fontStyle: 'italic',
      ...style,
    }}>
      {children}
    </span>
  );
}
