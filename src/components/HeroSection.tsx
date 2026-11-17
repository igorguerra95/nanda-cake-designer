import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { HERO_MEDIA } from '../data/cakes';

interface HeroSectionProps {
  onContactClick: () => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE_OUT },
        };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-tropical-canvas surface-grain border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-20 lg:px-10 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Editorial Esquerda */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div className="space-y-6">
              <motion.p
                {...reveal(0)}
                className="flex flex-wrap items-center gap-2.5 text-xs font-medium tracking-wider text-muted-foreground uppercase"
              >
                <span className="text-primary">Nanda Cake Designer</span>
                <span aria-hidden="true" className="text-gold">
                  ·
                </span>
                <span>Alta Confeitaria &amp; Design de Bolos</span>
              </motion.p>

              <motion.h1
                {...reveal(0.08)}
                className="font-display font-semibold tracking-[-0.03em] text-foreground leading-[0.98] [text-wrap:balance]"
                style={{ fontSize: 'clamp(2.85rem, 5.5vw, 5.5rem)' }}
              >
                Bolos esculpidos para eternizar momentos raros.
              </motion.h1>

              <motion.p
                {...reveal(0.16)}
                className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Cada criação da Nanda Cake Designer une estrutura precisa,
                buttercream de merengue suíço sedoso e flores delicadas em
                composições sob medida — feitas à mão para celebrar com leveza,
                presença e sabor inesquecível.
              </motion.p>

              <motion.div
                {...reveal(0.24)}
                className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5"
              >
                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-editorial transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground hover:shadow-editorial-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Entrar em contato</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href="#cardapio"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border bg-card/85 px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-border-strong hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0"
                >
                  <span>Ver coleções</span>
                  <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
                </a>
              </motion.div>
            </div>

            {/* Faixa discreta de fundamentos do ateliê */}
            <motion.div
              {...reveal(0.32)}
              className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:gap-6"
            >
              <div>
                <p className="text-xs font-medium text-gold uppercase tracking-wider">
                  Acabamento
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  Buttercream Suíço Sedoso
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gold uppercase tracking-wider">
                  Composição
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  Flores Naturais &amp; Ouro 24k
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gold uppercase tracking-wider">
                  Encomendas
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  Produção 100% Sob Medida
                </p>
              </div>
            </motion.div>
          </div>

          {/* Coluna Visual Direita */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.14, ease: EASE_OUT }}
            className="flex flex-col lg:col-span-5"
          >
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-border-strong/60 bg-card p-2.5 shadow-editorial">
              <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-[calc(1.5rem-10px)] bg-quartz-soft sm:min-h-[380px]">
                {!imageError ? (
                  <img
                    src={HERO_MEDIA.image}
                    alt={HERO_MEDIA.alt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full min-h-[320px] w-full flex-col items-center justify-center bg-quartz-gold-sheen p-8 text-center">
                    <Sparkles
                      className="mb-3 h-8 w-8 text-primary"
                      aria-hidden="true"
                    />
                    <p className="font-display text-xl font-medium text-foreground">
                      Bolo Escultural em Camadas
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Buttercream branco gelo, pétalas rosa quartzo e folha de
                      ouro
                    </p>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-foreground/55 via-foreground/15 to-transparent"
                />

                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 text-primary-foreground">
                  <div>
                    <p className="text-xs font-medium tracking-wider uppercase text-gold-soft">
                      Coleção Ateliê
                    </p>
                    <p className="font-display text-lg font-medium leading-snug">
                      Dois Andares · Pétalas &amp; Ouro
                    </p>
                  </div>
                  <span className="text-xs font-medium tabular-nums text-primary-foreground/90 whitespace-nowrap">
                    Sob encomenda
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
