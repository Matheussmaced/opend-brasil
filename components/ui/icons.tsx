import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  ...p,
});

export const PlayIcon = (p: P) => (
  <svg {...base(p)}><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" /></svg>
);
export const PauseIcon = (p: P) => (
  <svg {...base(p)}><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
);
export const NextIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 5.5v13a1 1 0 0 0 1.55.83L16 13v5a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0v5L6.55 4.67A1 1 0 0 0 5 5.5Z" /></svg>
);
export const PrevIcon = (p: P) => (
  <svg {...base(p)}><path d="M19 5.5v13a1 1 0 0 1-1.55.83L8 13v5a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5l9.45-6.33A1 1 0 0 1 19 5.5Z" /></svg>
);
export const ShuffleIcon = (p: P) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", ...p })}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);
export const RepeatIcon = (p: P) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", ...p })}>
    <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
);
export const HeartIcon = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base({ fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 2, ...p })}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
export const VolumeIcon = ({ muted, ...p }: P & { muted?: boolean }) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", ...p })}>
    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
    {muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />}
  </svg>
);
export const VideoIcon = (p: P) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", ...p })}>
    <rect x="2" y="5" width="15" height="14" rx="2" /><path d="m22 8-5 4 5 4V8Z" />
  </svg>
);
export const QueueIcon = (p: P) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", ...p })}>
    <path d="M3 6h13M3 12h13M3 18h9M19 15v6M16 18h6" />
  </svg>
);
export const HomeIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3L12 3Z" /></svg>
);
export const SearchIcon = (p: P) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", ...p })}>
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", ...p })}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const MusicIcon = (p: P) => (
  <svg {...base({ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", ...p })}>
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);
