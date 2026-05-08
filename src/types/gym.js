// src/types/gym.js
// Modelo dinámico de personas. Las personas se gestionan en runtime (CRUD).

export const COLOR_PRESETS = [
  '#FF5757', // coral (brand)
  '#F59E0B', // amber
  '#22A06B', // green
  '#0EA5E9', // sky
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#F43F5E', // rose
  '#14B8A6', // teal
  '#EAB308', // yellow
  '#6366F1', // indigo
];

export const ICON_PRESETS = [
  '❄️', '🍗', '🔥', '⚡', '🌟', '💪', '🦁', '🐉', '🐺', '🦊',
  '🐼', '🐯', '🦄', '🌈', '🚀', '⛰️', '🌊', '🌙', '☀️', '🍀',
];

// Iconos vectoriales (Ionicons). Prefijados con "ion:" para diferenciarlos
// de emojis y poder almacenarlos en el mismo campo `icon`.
export const ICON_LIBRARY = [
  'ion:barbell',
  'ion:flame',
  'ion:flash',
  'ion:rocket',
  'ion:fitness',
  'ion:heart',
  'ion:star',
  'ion:trophy',
  'ion:bonfire',
  'ion:planet',
  'ion:diamond',
  'ion:leaf',
  'ion:moon',
  'ion:sunny',
  'ion:water',
  'ion:musical-notes',
  'ion:basketball',
  'ion:bicycle',
  'ion:american-football',
  'ion:paw',
];

export const DEFAULT_USERS = () => [
  {
    id: 'usr_yeli',
    name: 'Yeli',
    icon: '❄️',
    color: '#38BDF8',
    createdAt: Date.now(),
  },
  {
    id: 'usr_luis',
    name: 'Luis',
    icon: '🍗',
    color: '#F59E0B',
    createdAt: Date.now() + 1,
  },
];

export const DEFAULT_NOTIFICATIONS = () => ({
  enabled: false,
  hour: 20,
  minute: 0,
});

export const newUserId = () =>
  `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
