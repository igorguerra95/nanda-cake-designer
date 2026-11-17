import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../data/cakes';

export const WhatsAppFloat: React.FC = () => {
  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Entrar em contato pelo WhatsApp ${BRAND.phoneDisplay}`}
        title={`WhatsApp ${BRAND.phoneDisplay}`}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-editorial-hover transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-quartz/45 motion-safe:animate-ping"
          style={{ animationDuration: '2.8s' }}
        />
        <MessageCircle className="relative h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
};
