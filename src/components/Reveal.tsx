import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
}

const Reveal = ({ children, className, delay = 0, as = 'div' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn('reveal', visible && 'reveal-visible', className)}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
