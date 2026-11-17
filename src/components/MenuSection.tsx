import React, { useState } from 'react';
import { ArrowUpRight, CakeSlice } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CakeCategory,
  CakeProduct,
  CakeSize,
  formatCurrencyBRL,
  MENU_CAKES,
  MENU_CATEGORIES,
} from '../data/cakes';

interface MenuSectionProps {
  onSelectProduct: (product: CakeProduct, size: CakeSize) => void;
}

const SIZES: CakeSize[] = ['15 fatias', '25 fatias', '40 fatias'];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('Todos');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, CakeSize>>({
    'bolo-quartzo-rose': '25 fatias',
    'escultura-veleiro-dourado': '25 fatias',
    'jardim-figo-baunilha': '15 fatias',
  });
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();

  const visibleProducts =
    activeCategory === 'Todos'
      ? MENU_CAKES
      : MENU_CAKES.filter((item) => item.category === activeCategory);

  const handleSizeChange = (productId: string, size: CakeSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section
      id="cardapio"
      className="bg-background py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Cabeçalho do Cardápio + Filtros Interativos */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium tracking-wider text-gold uppercase">
              Cardápio Digital · Coleções Autorais
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl [text-wrap:balance]">
              Três criações assinadas para celebrações memoráveis.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Escolha o rendimento ideal para o número de convidados. Cada bolo
              é modelado e decorado artesanalmente na semana do seu evento.
            </p>
          </div>

          {/* Controle segmentado de filtro por categoria */}
          <div
            role="tablist"
            aria-label="Filtrar bolos por estilo"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-muted/60 p-1.5 self-start lg:self-auto"
          >
            {MENU_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
                    isActive
                      ? 'bg-card text-foreground shadow-editorial'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grade de 3 Cards de Bolos */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {visibleProducts.map((product, idx) => {
            const currentSize = selectedSizes[product.id] ?? '25 fatias';
            const currentPrice = product.prices[currentSize];
            const isBroken = failedImages[product.id];

            return (
              <motion.article
                key={product.id}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: 'easeOut',
                }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-editorial transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-editorial-hover"
              >
                {/* Fotografia 4:3 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-tint">
                  {!isBroken ? (
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [product.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-quartz-gold-sheen p-6 text-center">
                      <CakeSlice
                        className="mb-2 h-7 w-7 text-primary"
                        aria-hidden="true"
                      />
                      <span className="font-display text-lg font-medium text-foreground">
                        {product.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-gold tabular-nums">
                        {product.index} · {product.category}
                      </span>
                      <span className="tabular-nums">{currentSize}</span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-primary">
                      {product.tagline}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>

                    <p className="mt-4 border-t border-border/70 pt-3 text-xs leading-relaxed text-muted-foreground">
                      {product.details.join(' · ')}
                    </p>
                  </div>

                  {/* Seletor de Rendimento + Valor + CTA */}
                  <div className="mt-6 space-y-4 border-t border-border pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div
                        role="group"
                        aria-label={`Selecionar rendimento para ${product.name}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1"
                      >
                        {SIZES.map((size) => {
                          const selected = currentSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeChange(product.id, size)}
                              className={`min-h-[36px] rounded-md px-2.5 py-1 text-xs font-medium tabular-nums transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
                                selected
                                  ? 'bg-foreground text-primary-foreground'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-right">
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          A partir de
                        </span>
                        <span className="font-display text-xl font-semibold tabular-nums text-foreground">
                          {formatCurrencyBRL(currentPrice)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(product, currentSize)}
                      className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap cursor-pointer"
                    >
                      <span>Entrar em contato</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
