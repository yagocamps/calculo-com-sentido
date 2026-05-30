// Design tokens — paleta acolhedora, tipografia, espaçamento
// Uso: cores warm cream + texto marrom + acento terracota.

const T = {
  // Backgrounds
  bg:        '#FAF6EF',  // off-white cream
  surface:   '#FFFFFF',  // cards
  surfaceWarm:'#F4EDE0', // cream mais escuro (sidebar, áreas calmas)
  surfaceSoft:'#FBF6EB', // hover
  surfaceInk:'#2A211A',  // dark warm — usado em CTAs/dark sections

  // Texto
  ink:       '#2A211A',  // marrom profundo quase preto
  inkMuted:  '#6E5C4E',  // marrom-taupe
  inkSubtle: '#A08C7B',  // taupe claro
  inkOnDark: '#FAF6EF',

  // Bordas
  border:    '#E8DFD0',
  borderSoft:'#F0E8D9',
  borderInk: '#2A211A',

  // Acentos
  terracotta:    '#C2553D', // primary accent — botões principais
  terracottaSoft:'#F4D9CF',
  terracottaInk: '#7A2E1F',

  sage:          '#7A9275', // verde sálvia — concluído / progresso
  sageSoft:      '#D9E3D2',
  sageInk:       '#3F5B3A',

  sky:           '#6B8AAE', // azul calmo — info / tags
  skySoft:       '#D8E3EE',
  skyInk:        '#33506E',

  amber:         '#D6A24A', // amber — destaque / dica
  amberSoft:     '#F3E3C0',
  amberInk:      '#7A5616',

  // Tipografia
  serif:  '"Newsreader", "Source Serif Pro", Georgia, serif',
  sans:   '"DM Sans", "Inter Tight", system-ui, sans-serif',
  mono:   '"JetBrains Mono", "IBM Plex Mono", monospace',

  // Sombras
  shadowSm: '0 1px 2px rgba(42,33,26,0.04), 0 1px 1px rgba(42,33,26,0.03)',
  shadowMd: '0 6px 16px -8px rgba(42,33,26,0.12), 0 2px 4px rgba(42,33,26,0.04)',
  shadowLg: '0 18px 48px -20px rgba(42,33,26,0.18), 0 4px 12px rgba(42,33,26,0.05)',

  // Radii
  r1: '8px',
  r2: '14px',
  r3: '20px',
  r4: '28px',
};

window.T = T;
