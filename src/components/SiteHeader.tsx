import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const links = [
  { href: '/#products', label: 'Продукция' },
  { href: '/#news', label: 'Новости' },
  { href: '/about', label: 'О нас' },
  { href: '/#contact', label: 'Заявка' },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled || open ? 'glass-header py-3' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <img
            src="/img/logo.webp"
            alt="ЭкоФиш+"
            className={cn('w-auto transition-all duration-500 group-hover:scale-105', scrolled ? 'h-10' : 'h-12')}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="tel:89275731273" className="hidden md:inline-flex btn-gold text-sm">
          <Icon name="Phone" size={16} />
          8 927 573 12 73
        </a>

        <button
          className="md:hidden text-primary p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden container mx-auto flex flex-col gap-4 pt-6 pb-4 animate-fade-in">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg text-foreground/90 hover:text-primary">
              {l.label}
            </a>
          ))}
          <a href="tel:89275731273" className="btn-gold justify-center">
            <Icon name="Phone" size={16} />
            Позвонить
          </a>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
