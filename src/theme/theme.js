// src/theme/theme.js
// Design tokens centralizados. Look premium, claro, suave.

// Paleta inspirada en el icono de la app: coral vibrante (#FF5757) sobre
// blanco crema con detalles oscuros. Look minimalista y moderno.
export const PALETTE = {
  bg: '#FFF7F5',
  surface: '#FFFFFF',
  surfaceAlt: '#FFF0EC',
  border: '#FBE2DD',
  borderStrong: '#F5C6BD',
  text: '#3F3236',
  textMuted: '#7E6B6F',
  textSubtle: '#B79898',
  accent: '#FF5757',
  accentSoft: '#FFE4E1',
  accentDark: '#E04646',
  success: '#22A06B',
  warning: '#F59E0B',
  danger: '#E04646',
  dangerSoft: '#FFE4E1',
  overlay: 'rgba(31, 20, 22, 0.5)',
};

// Gradientes reutilizables (top-left → bottom-right).
export const GRADIENTS = {
  primary: ['#FF7A7A', '#FF5757', '#E04646'],
  primarySoft: ['#FFE4E1', '#FFD1CB'],
  hero: ['#FF8A7A', '#FF5757', '#D93C3C'],
  danger: ['#FF8585', '#E04646', '#B83232'],
  success: ['#34D399', '#10B981', '#059669'],
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const SHADOW = {
  card: {
    shadowColor: '#7A1F1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  modal: {
    shadowColor: '#7A1F1F',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: {
    shadowColor: '#FF5757',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
  },
};

export const FONT = {
  size: { xs: 11, sm: 12, md: 14, lg: 16, xl: 20, xxl: 26, display: 32 },
  weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  family: {
    light: 'Inter_300Light',
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
};
