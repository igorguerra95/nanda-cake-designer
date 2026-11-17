import React from 'react';
import { BRAND, buildWhatsAppUrl } from '../data/cakes';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a
              href="#inicio"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              {BRAND.name}
            </a>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {BRAND.descriptor} · {BRAND.addressLabel}
            </p>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <a
              href="#inicio"
              className="transition-colors hover:text-foreground whitespace-nowrap"
            >
              Início
            </a>
            <a
              href="#cardapio"
              className="transition-colors hover:text-foreground whitespace-nowrap"
            >
              Cardápio
            </a>
            <a
              href="#sobre"
              className="transition-colors hover:text-foreground whitespace-nowrap"
            >
              Sobre nós
            </a>
            <a
              href="#contato"
              className="transition-colors hover:text-foreground whitespace-nowrap"
            >
              Contato
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:text-foreground whitespace-nowrap tabular-nums"
            >
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Todos os direitos
            reservados.
          </p>
          <p>{BRAND.hoursLabel}</p>
        </div>
      </div>
    </footer>
  );
};
