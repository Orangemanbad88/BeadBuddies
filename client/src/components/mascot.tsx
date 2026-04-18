type MascotProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export const Mascot = ({ size = 160, className = "", ...rest }: MascotProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Friendly dog mascot"
      {...rest}
    >
      <ellipse cx="100" cy="210" rx="70" ry="8" fill="hsl(var(--ink) / 0.08)" />
      <ellipse cx="100" cy="160" rx="52" ry="50" fill="#E8AE7A" stroke="#3B2A1E" strokeWidth="3" />
      <ellipse cx="100" cy="158" rx="34" ry="30" fill="#F9E0C2" />
      <ellipse cx="100" cy="96" rx="46" ry="42" fill="#E8AE7A" stroke="#3B2A1E" strokeWidth="3" />
      <path d="M62 70 Q58 105 72 115 Q78 92 78 76 Z" fill="#BF7F4D" stroke="#3B2A1E" strokeWidth="3" strokeLinejoin="round" />
      <path d="M138 70 Q142 105 128 115 Q122 92 122 76 Z" fill="#BF7F4D" stroke="#3B2A1E" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="86" cy="94" r="6" fill="#2A1B1B" />
      <circle cx="114" cy="94" r="6" fill="#2A1B1B" />
      <circle cx="88" cy="92" r="2" fill="#FFF" />
      <circle cx="116" cy="92" r="2" fill="#FFF" />
      <ellipse cx="100" cy="108" rx="5" ry="4" fill="#2A1B1B" />
      <path d="M100 112 Q100 120 93 120" stroke="#2A1B1B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M100 112 Q100 120 107 120" stroke="#2A1B1B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="74" cy="104" r="6" fill="hsl(var(--coral) / 0.55)" />
      <circle cx="126" cy="104" r="6" fill="hsl(var(--coral) / 0.55)" />
      <path d="M62 130 Q100 142 138 130" stroke="hsl(var(--coral-deep))" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="74" cy="133" r="3.5" fill="hsl(var(--sun))" stroke="#3B2A1E" strokeWidth="1" />
      <circle cx="88" cy="137" r="3.5" fill="hsl(var(--sage))" stroke="#3B2A1E" strokeWidth="1" />
      <circle cx="100" cy="139" r="4" fill="hsl(var(--coral))" stroke="#3B2A1E" strokeWidth="1" />
      <circle cx="112" cy="137" r="3.5" fill="hsl(var(--plum))" stroke="#3B2A1E" strokeWidth="1" />
      <circle cx="126" cy="133" r="3.5" fill="hsl(var(--sun))" stroke="#3B2A1E" strokeWidth="1" />
    </svg>
  );
};
