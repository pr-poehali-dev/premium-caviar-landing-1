import { useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  max?: number;
}

const TiltCard = ({ children, className, onClick, max = 6 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={cn('tilt-card', className)}
    >
      <div className="tilt-spot" aria-hidden />
      {children}
    </div>
  );
};

export default TiltCard;
