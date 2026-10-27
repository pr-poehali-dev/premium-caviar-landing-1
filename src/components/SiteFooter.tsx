import { Link } from 'react-router-dom';

const SiteFooter = () => (
  <footer className="border-t border-primary/15 bg-card/40 py-12 px-4">
    <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
      <img src="/img/logo.webp" alt="ЭкоФиш+" className="h-14 w-auto opacity-90" />
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a href="tel:89275731273" className="hover:text-primary transition-colors">Валерий: 8 927 573 12 73</a>
        <a href="tel:89275607919" className="hover:text-primary transition-colors">Любовь: 8 927 560 79 19</a>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 items-center text-center">
        <Link to="/about" className="hover:text-primary transition-colors">О нас</Link>
        <Link to="/privacy" className="hover:text-primary transition-colors">Конфиденциальность</Link>
        <span>© {new Date().getFullYear()} ООО «ЭкоФиш+»</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
