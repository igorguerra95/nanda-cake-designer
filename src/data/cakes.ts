import heroCakeImg from '../assets/images/hero_cake_sculpture_1794944807358.jpg';
import quartzoCakeImg from '../assets/images/menu_cake_quartzo_1794944807944.jpg';
import ouroCakeImg from '../assets/images/menu_cake_ouro_1794944808430.jpg';
import classicoCakeImg from '../assets/images/menu_cake_classico_1794944809544.jpg';
import atelierCakeImg from '../assets/images/about_cake_atelier_1794944809820.jpg';

export type CakeCategory = 'Todos' | 'Assinatura' | 'Esculturais' | 'Botânicos';
export type CakeSize = '15 fatias' | '25 fatias' | '40 fatias';

export interface CakeProduct {
  id: string;
  index: string;
  name: string;
  category: Exclude<CakeCategory, 'Todos'>;
  tagline: string;
  description: string;
  details: string[];
  prices: Record<CakeSize, number>;
  image: string;
  imageAlt: string;
}

export interface StudioStat {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  detail: string;
}

export const BRAND = {
  name: 'Nanda Cake Designer',
  shortName: 'Nanda Cake',
  descriptor: 'Ateliê de Design de Bolos & Confeitaria Autoral',
  phoneDisplay: '(00) 00000-0000',
  whatsappDigits: '5500000000000',
  addressLabel: 'Atendimento e retiradas mediante agendamento',
  hoursLabel: 'Horário sob consulta via WhatsApp',
};

export const HERO_MEDIA = {
  image: heroCakeImg,
  alt: 'Bolo artístico de dois andares da Nanda Cake Designer com cobertura lisa em buttercream branco gelo, flores em papel de arroz rosa quartzo e detalhes em folha de ouro comestível.',
};

export const ATELIER_MEDIA = {
  image: atelierCakeImg,
  alt: 'Ateliê da Nanda Cake Designer com bancada em mármore claro, espátulas douradas, flores naturais em tons rosados e confeiteira finalizando bolo em andares.',
};

export const MENU_CATEGORIES: CakeCategory[] = [
  'Todos',
  'Assinatura',
  'Esculturais',
  'Botânicos',
];

export const MENU_CAKES: CakeProduct[] = [
  {
    id: 'bolo-quartzo-rose',
    index: '01',
    name: 'Quartzo Rosé Espatulado',
    category: 'Assinatura',
    tagline: 'Textura orgânica com rosas naturais e framboesa ácida',
    description:
      'Massa amanteigada de baunilha de Madagascar recheada com compota artesanal de framboesas frescas e brigadeiro branco cremoso, finalizada em buttercream rosa quartzo com folha de ouro.',
    details: [
      'Massa de Baunilha',
      'Geleia de Framboesa',
      'Buttercream Suíço',
      'Rosas Naturais',
      'Folha de Ouro 24k',
    ],
    prices: {
      '15 fatias': 260,
      '25 fatias': 390,
      '40 fatias': 580,
    },
    image: quartzoCakeImg,
    imageAlt:
      'Bolo Quartzo Rosé Espatulado em buttercream rosa claro texturizado, decorado com rosas frescas, framboesas e folha de ouro em boleira branca.',
  },
  {
    id: 'escultura-veleiro-dourado',
    index: '02',
    name: 'Veleiro Dourado',
    category: 'Esculturais',
    tagline: 'Geometria em altura com velas de caramelo translúcido',
    description:
      'Estrutura contemporânea para grandes celebrações com massa de cacau 70%, ganache meio amarga e praliné crocante de avelãs tostadas, ornado com lâminas de açúcar dourado.',
    details: [
      'Massa Cacau 70%',
      'Praliné de Avelã',
      'Ganache Nobre',
      'Velas de Açúcar',
      'Acabamento Acetinado',
    ],
    prices: {
      '15 fatias': 310,
      '25 fatias': 460,
      '40 fatias': 690,
    },
    image: ouroCakeImg,
    imageAlt:
      'Bolo alto Veleiro Dourado em buttercream marfim acetinado com esculturas translúcidas de caramelo dourado, crocância de avelã e detalhes metálicos.',
  },
  {
    id: 'jardim-figo-baunilha',
    index: '03',
    name: 'Jardim de Figo & Baunilha',
    category: 'Botânicos',
    tagline: 'Leveza semi-naked com frutas de estação e favas reais',
    description:
      'Camadas aparentes de pão de ló úmido com creme sedoso de mascarpone e favas de baunilha, equilibrado com figos frescos, amoras, morangos selecionados e pétalas comestíveis.',
    details: [
      'Creme Mascarpone',
      'Favas de Baunilha',
      'Figos & Amoras',
      'Acabamento Semi-Naked',
      'Pétalas Comestíveis',
    ],
    prices: {
      '15 fatias': 280,
      '25 fatias': 420,
      '40 fatias': 620,
    },
    image: classicoCakeImg,
    imageAlt:
      'Bolo Jardim de Figo e Baunilha em estilo semi-naked com creme claro pontilhado de baunilha, figos frescos, amoras, morangos e pétalas rosadas.',
  },
];

export const STUDIO_STATS: StudioStat[] = [
  {
    id: 'sob-medida',
    value: 100,
    suffix: '%',
    label: 'Projetos Sob Medida',
    detail: 'Cada bolo nasce a partir da paleta, do evento e do seu paladar',
  },
  {
    id: 'sabores',
    value: 16,
    suffix: '+',
    label: 'Combinações Autorais',
    detail: 'Massas leves, compotas artesanais e ganaches de chocolate belga',
  },
  {
    id: 'eventos',
    value: 420,
    suffix: '+',
    label: 'Celebrações Assinadas',
    detail: 'Casamentos, aniversários intimistas e mesas comemorativas',
  },
  {
    id: 'avaliacao',
    value: 4.9,
    decimals: 1,
    suffix: '/5',
    label: 'Aprovação das Clientes',
    detail: 'Reconhecimento em delicadeza estética e equilíbrio de doçura',
  },
];

export function formatCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    'Olá! Gostaria de entrar em contato para encomendar um bolo com a Nanda Cake Designer.';
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${BRAND.whatsappDigits}?text=${text}`;
}
