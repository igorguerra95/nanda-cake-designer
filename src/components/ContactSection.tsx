import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  BRAND,
  buildWhatsAppUrl,
  CakeSize,
  formatCurrencyBRL,
  MENU_CAKES,
} from '../data/cakes';

interface SelectedOrder {
  productId: string;
  size: CakeSize;
}

interface ContactSectionProps {
  selectedOrder: SelectedOrder;
  onOrderChange: (order: SelectedOrder) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedOrder,
  onOrderChange,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const chosenProduct =
    MENU_CAKES.find((item) => item.id === selectedOrder.productId) ??
    MENU_CAKES[0];
  const chosenPrice = chosenProduct.prices[selectedOrder.size];

  useEffect(() => {
    setSubmittedUrl(null);
  }, [selectedOrder.productId, selectedOrder.size]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim();
    const digitsOnly = phone.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setError('Informe seu nome para prepararmos o orçamento.');
      return;
    }

    if (digitsOnly.length < 10) {
      setError('Informe um WhatsApp ou telefone válido com DDD.');
      return;
    }

    setError('');
    const message = [
      `Olá, equipe ${BRAND.name}!`,
      `Meu nome é ${cleanName} (WhatsApp: ${phone.trim()}).`,
      `Gostaria de encomendar o bolo: ${chosenProduct.name} (${selectedOrder.size}) — valor base ${formatCurrencyBRL(chosenPrice)}.`,
      notes.trim() ? `Detalhes do evento: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    setSubmittedUrl(buildWhatsAppUrl(message));
  };

  return (
    <section id="contato" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Informações de Contato */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wider text-gold uppercase">
                Contato · Encomendas &amp; Orçamentos
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl [text-wrap:balance]">
                Reserve sua data e crie um bolo exclusivo para o seu evento.
              </h2>

              <p className="text-base leading-relaxed text-muted-foreground">
                Fale diretamente com a Nanda Cake Designer pelo formulário ao
                lado ou via WhatsApp para verificar disponibilidade de agenda,
                personalizar sabores e definir a paleta de decoração.
              </p>
            </div>

            <div className="mt-10 space-y-4 border-t border-border pt-8">
              <div className="flex items-start gap-3.5">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Telefone &amp; WhatsApp
                  </p>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-block text-base font-semibold tabular-nums text-foreground transition-colors hover:text-primary"
                  >
                    {BRAND.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Ateliê
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">
                    {BRAND.addressLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Horário de atendimento
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">
                    {BRAND.hoursLabel}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário Interativo de Encomenda */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: 'easeOut',
            }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-border bg-card p-6 shadow-editorial sm:p-8 lg:p-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-5">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    Solicitar orçamento
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Preencha os detalhes para gerar sua mensagem pronta no
                    WhatsApp.
                  </p>
                </div>
                <span className="font-display text-xl font-semibold tabular-nums text-primary">
                  {formatCurrencyBRL(chosenPrice)}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="order-product"
                    className="block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Modelo escolhido
                  </label>
                  <select
                    id="order-product"
                    value={selectedOrder.productId}
                    onChange={(e) =>
                      onOrderChange({
                        ...selectedOrder,
                        productId: e.target.value,
                      })
                    }
                    className="mt-2 w-full min-h-[46px] rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none"
                  >
                    {MENU_CAKES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="order-size"
                    className="block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Rendimento estimado
                  </label>
                  <select
                    id="order-size"
                    value={selectedOrder.size}
                    onChange={(e) =>
                      onOrderChange({
                        ...selectedOrder,
                        size: e.target.value as CakeSize,
                      })
                    }
                    className="mt-2 w-full min-h-[46px] rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm tabular-nums text-foreground transition-colors focus:border-primary focus:outline-none"
                  >
                    <option value="15 fatias">
                      15 fatias · {formatCurrencyBRL(chosenProduct.prices['15 fatias'])}
                    </option>
                    <option value="25 fatias">
                      25 fatias · {formatCurrencyBRL(chosenProduct.prices['25 fatias'])}
                    </option>
                    <option value="40 fatias">
                      40 fatias · {formatCurrencyBRL(chosenProduct.prices['40 fatias'])}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Seu nome
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex.: Camila Ferreira"
                    className="mt-2 w-full min-h-[46px] rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    WhatsApp com DDD
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-2 w-full min-h-[46px] rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm tabular-nums text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="order-notes"
                  className="block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Data do evento, paleta de cores ou sabores desejados
                </label>
                <textarea
                  id="order-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex.: Aniversário em 18 de dezembro, tons rosa quartzo e dourado, massa de baunilha com frutas vermelhas."
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-primary/40 bg-quartz-soft px-4 py-2.5 text-sm font-medium text-primary"
                >
                  {error}
                </p>
              )}

              {submittedUrl && (
                <div
                  role="status"
                  className="mt-5 flex flex-col gap-3 rounded-2xl border border-border-strong bg-surface-tint p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Solicitação pronta para envio
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {chosenProduct.name} ({selectedOrder.size}) ·{' '}
                        {formatCurrencyBRL(chosenPrice)}
                      </p>
                    </div>
                  </div>
                  <a
                    href={submittedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary whitespace-nowrap shrink-0"
                  >
                    <span>Abrir no WhatsApp</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Atendimento direto pelo número {BRAND.phoneDisplay}.
                </p>
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-editorial transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Entrar em contato</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
