/**
 * Circuit layout presets for the Skills integration network.
 *
 * Desktop Canvas (SVG viewBox): 1000 x 600, hub center at (500, 300).
 * Outermost nodes sit at x ≈ 35 / 965 so they align with the
 * `max-w-6xl` content width used by the other sections.
 *
 * Mobile Canvas (SVG viewBox): 400 x 580, hub center at (200, 290).
 * Two-column portrait integration layout with ample vertical breathing room,
 * zero clipping, and touch-friendly node targets.
 */
export const NETWORK_VIEWBOX = { width: 1000, height: 600 } as const;
export const MOBILE_VIEWBOX = { width: 400, height: 580 } as const;

export interface NodePreset {
  /** Node center (SVG user units). */
  x: number;
  y: number;
  /** Circuit path from the hub to the node. */
  path: string;
}

/* ------------------------------------------------------------------ */
/* Desktop Presets (1000 x 600)                                       */
/* ------------------------------------------------------------------ */

// 10-node layout (Frontend / Backend)
export const TEN_NODE_PRESETS: NodePreset[] = [
  // Top-Left Outer
  { x: 35, y: 95, path: "M 455 275 H 200 Q 180 275 180 255 V 115 Q 180 95 160 95 H 35" },
  // Top-Left Inner
  { x: 270, y: 115, path: "M 475 255 V 135 Q 475 115 455 115 H 270" },
  // Mid-Left Outer
  { x: 35, y: 300, path: "M 450 300 H 35" },
  // Bottom-Left Inner
  { x: 270, y: 485, path: "M 475 345 V 465 Q 475 485 455 485 H 270" },
  // Bottom-Left Outer
  { x: 35, y: 505, path: "M 455 325 H 200 Q 180 325 180 345 V 485 Q 180 505 160 505 H 35" },
  // Top-Right Inner
  { x: 730, y: 115, path: "M 525 255 V 135 Q 525 115 545 115 H 730" },
  // Top-Right Outer
  { x: 965, y: 95, path: "M 545 275 H 800 Q 820 275 820 255 V 115 Q 820 95 840 95 H 965" },
  // Mid-Right Outer
  { x: 965, y: 300, path: "M 550 300 H 965" },
  // Bottom-Right Inner
  { x: 730, y: 485, path: "M 525 345 V 465 Q 525 485 545 485 H 730" },
  // Bottom-Right Outer
  { x: 965, y: 505, path: "M 545 325 H 800 Q 820 325 820 345 V 485 Q 820 505 840 505 H 965" },
];

// 4-node layout (Tools / Design)
export const FOUR_NODE_PRESETS: NodePreset[] = [
  // Top-Left
  { x: 45, y: 160, path: "M 455 280 H 220 Q 200 280 200 260 V 180 Q 200 160 180 160 H 45" },
  // Top-Right
  { x: 955, y: 160, path: "M 545 280 H 780 Q 800 280 800 260 V 180 Q 800 160 820 160 H 955" },
  // Bottom-Left
  { x: 45, y: 440, path: "M 455 320 H 220 Q 200 320 200 340 V 420 Q 200 440 180 440 H 45" },
  // Bottom-Right
  { x: 955, y: 440, path: "M 545 320 H 780 Q 800 320 800 340 V 420 Q 800 440 820 440 H 955" },
];

export const getNodePresets = (count: number): NodePreset[] =>
  count <= FOUR_NODE_PRESETS.length ? FOUR_NODE_PRESETS : TEN_NODE_PRESETS;

/* ------------------------------------------------------------------ */
/* Mobile / Tablet Presets (400 x 580)                                */
/* ------------------------------------------------------------------ */

// 10-node layout (Mobile portrait, 5 on left, 5 on right)
export const MOBILE_TEN_NODE_PRESETS: NodePreset[] = [
  // 0: Top-Left
  { x: 65, y: 65, path: "M 175 270 H 115 Q 95 270 95 250 V 85 Q 95 65 75 65 H 65" },
  // 1: Mid-Top-Left
  { x: 65, y: 175, path: "M 175 280 H 135 Q 115 280 115 260 V 195 Q 115 175 95 175 H 65" },
  // 2: Mid-Left
  { x: 65, y: 290, path: "M 170 290 H 65" },
  // 3: Mid-Bottom-Left
  { x: 65, y: 405, path: "M 175 300 H 135 Q 115 300 115 320 V 385 Q 115 405 95 405 H 65" },
  // 4: Bottom-Left
  { x: 65, y: 515, path: "M 175 310 H 115 Q 95 310 95 330 V 495 Q 95 515 75 515 H 65" },
  // 5: Top-Right
  { x: 335, y: 65, path: "M 225 270 H 285 Q 305 270 305 250 V 85 Q 305 65 325 65 H 335" },
  // 6: Mid-Top-Right
  { x: 335, y: 175, path: "M 225 280 H 265 Q 285 280 285 260 V 195 Q 285 175 305 175 H 335" },
  // 7: Mid-Right
  { x: 335, y: 290, path: "M 230 290 H 335" },
  // 8: Mid-Bottom-Right
  { x: 335, y: 405, path: "M 225 300 H 265 Q 285 300 285 320 V 385 Q 285 405 305 405 H 335" },
  // 9: Bottom-Right
  { x: 335, y: 515, path: "M 225 310 H 285 Q 305 310 305 330 V 495 Q 305 515 325 515 H 335" },
];

// 4-node layout (Mobile portrait, 2 on left, 2 on right)
export const MOBILE_FOUR_NODE_PRESETS: NodePreset[] = [
  // 0: Top-Left
  { x: 75, y: 180, path: "M 175 280 H 125 Q 105 280 105 260 V 200 Q 105 180 85 180 H 75" },
  // 1: Top-Right
  { x: 325, y: 180, path: "M 225 280 H 275 Q 295 280 295 260 V 200 Q 295 180 315 180 H 325" },
  // 2: Bottom-Left
  { x: 75, y: 400, path: "M 175 300 H 125 Q 105 300 105 320 V 380 Q 105 400 85 400 H 75" },
  // 3: Bottom-Right
  { x: 325, y: 400, path: "M 225 300 H 275 Q 295 300 295 320 V 380 Q 295 400 315 400 H 325" },
];

export const getMobileNodePresets = (count: number): NodePreset[] =>
  count <= MOBILE_FOUR_NODE_PRESETS.length ? MOBILE_FOUR_NODE_PRESETS : MOBILE_TEN_NODE_PRESETS;
