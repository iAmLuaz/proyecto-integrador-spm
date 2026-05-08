// src/utils/applyFontPatch.js
// Reemplaza el render por defecto de <Text> para mapear fontWeight a la
// familia Inter correspondiente. Así no hay que tocar cada componente.

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONT, PALETTE } from '../theme/theme.js';

let patched = false;

const familyForWeight = (w) => {
  const v = String(w || '400');
  if (v === '700' || v === 'bold') return FONT.family.bold;
  if (v === '600') return FONT.family.semibold;
  if (v === '500') return FONT.family.medium;
  if (v === '300') return FONT.family.light;
  return FONT.family.regular;
};

export default function applyFontPatch() {
  if (patched) return;
  patched = true;

  const original = Text.render;
  Text.render = function patchedRender(...args) {
    const node = original.apply(this, args);
    const flat = StyleSheet.flatten(node.props.style) || {};
    const family = flat.fontFamily || familyForWeight(flat.fontWeight);
    return React.cloneElement(node, {
      style: [
        { fontFamily: family, color: PALETTE.text, fontWeight: 'normal' },
        node.props.style,
        { fontFamily: family, fontWeight: 'normal' },
      ],
    });
  };
}
