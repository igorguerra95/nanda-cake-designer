import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BRAND } from '../data/cakes';

interface NavbarProps {
  onContactClick: () => void;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#sobre', label: 'Sobre nós' },
  { href: '#contato', label: 'Contato' },
];

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handlePrimaryAction = () => {
    setMobileOpen(false);
    onContactClick();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border'
            : 'bg-background/80 backdrop-blur-sm border-b border-border/60'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-10">
          {/* Zona 1: Wordmark em linha única */}
          <a
            href="#inicio"
            className="font-display text-lg font-semibold tracking-tight text-foreground whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-xl"
          >
            {BRAND.name}
          </a>

          {/* Zona 2: Links concisos em tipografia limpa */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Zona 3: Ação principal única + gatilho de gaveta mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onContactClick}
              className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium tracking-wide text-primary-foreground shadow-editorial transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Entrar em contato</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile-sheet"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-border-strong md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Gaveta / Sheet Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-foreground/35 backdrop-blur-xs"
              aria-hidden="true"
            />
            <motion.aside
              id="menu-mobile-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação móvel"
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col justify-between border-l border-border bg-background p-6 shadow-editorial-hover"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-display text-lg font-semibold text-foreground">
                    {BRAND.shortName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Fechar menu"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav
                  aria-label="Links móveis"
                  className="mt-8 flex flex-col gap-2"
                >
                  {NAV_LINKS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex min-h-[44px] items-center justify-between border-b border-border/60 py-3 font-display text-xl font-medium text-foreground transition-colors hover:text-primary"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        className="h-4 w-4 text-gold"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {BRAND.descriptor}
                  <br />
                  Telefone: {BRAND.phoneDisplay}
                </p>
                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-editorial transition-colors hover:bg-foreground cursor-pointer"
                >
                  <span>Entrar em contato</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
