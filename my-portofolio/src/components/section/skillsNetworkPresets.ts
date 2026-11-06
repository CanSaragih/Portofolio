/**
 * Circuit layout presets for the Skills integration network.
 *
 * Canvas (SVG viewBox): 1000 x 600, hub center at (500, 300).
 * Outermost nodes sit at x ≈ 35 / 965 so they align with the
 * `max-w-6xl` content width used by the other sections.
 */
export const NETWORK_VIEWBOX = { width: 1000, height: 600 } as const;

export interface NodePreset {
  /** Node center (SVG user units). */
  x: number;
  y: number;
  /** Circuit path from the hub to the node. */
  path: string;
}

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

