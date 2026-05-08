// src/components/Icon.js
// Wrapper sobre @expo/vector-icons (Ionicons) para uso uniforme.

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE } from '../theme/theme.js';

const Icon = ({ name, size = 18, color = PALETTE.text, style }) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);

export default Icon;
