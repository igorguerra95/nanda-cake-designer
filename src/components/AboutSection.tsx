import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ATELIER_MEDIA, STUDIO_STATS, StudioStat } from '../data/cakes';

interface AboutSectionProps {
  onContactClick: () => void;
}

const AnimatedStatNumber: React.FC<{ stat: StudioStat }> = ({ stat }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(
    shouldReduceMotion ? stat.value : 0
  );

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (isInView) setDisplayValue(stat.value);
      return;
    }

    const durationMs = 1100;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = stat.value * eased;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(stat.value);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, shouldReduceMotion, stat.value]);

  const formatted = stat.decimals
    ? displayValue.toFixed(stat.decimals).replace('.', ',')
    : Math.round(displayValue).toLocaleString('pt-BR');

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix ?? ''}
      {formatted}
      {stat.suffix}
    </span>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({
  onContactClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      className="bg-surface-tint/55 py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Grade Assimétrica 12 colunas */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Imagem Editorial 16:9 */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col lg:col-span-7"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-editorial">
              <div className="relative aspect-[16/9] h-full w-full overflow-hidden rounded-[calc(1rem-8px)] bg-muted">
                {!imageError ? (
                  <img
                    src={ATELIER_MEDIA.image}
                    alt={ATELIER_MEDIA.alt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[260px] w-full flex-col items-center justify-center bg-quartz-gold-sheen p-8 text-center">
                    <Compass
                      className="mb-3 h-8 w-8 text-gold"
                      aria-hidden="true"
                    />
                    <p className="font-display text-xl font-medium text-foreground">
                      Ateliê Nanda Cake Designer
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Bancada em mármore, flores frescas e confeitaria autoral
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Texto Editorial Sobre Nós */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: shouldReduceMotion ? 0 : 0.1,
              ease: 'easeOut',
            }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wider text-gold uppercase">
                Sobre nós · Ateliê de Confeitaria
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl [text-wrap:balance]">
                Cada bolo é desenhado como peça única de mesa e memória.
              </h2>

              <p className="text-base leading-relaxed text-muted-foreground">
                A Nanda Cake Designer nasceu da paixão por unir estética
                contemporânea e confeitaria de verdade. Trabalhamos com insumos
                frescos, chocolate belga, frutas da estação e buttercream de
                merengue suíço de baixa doçura para garantir leveza a cada
                fatia.
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                Do esboço das proporções e cores à aplicação manual de flores e
                folhas de ouro, acompanhamos cada detalhe para que o bolo
                dialogue com a identidade da sua celebração.
              </p>
            </div>

            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-border-strong bg-card px-6 py-3 text-sm font-medium text-foreground shadow-editorial transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary whitespace-nowrap cursor-pointer"
              >
                <span>Entrar em contato</span>
                <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Faixa de Estatísticas com Count-Up */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STUDIO_STATS.map((stat) => (
            <div
              key={stat.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-editorial"
            >
              <div className="font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                <AnimatedStatNumber stat={stat} />
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {stat.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
