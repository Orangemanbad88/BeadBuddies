export default function DogMascotSVG({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Dog Body */}
      <ellipse cx="100" cy="170" rx="45" ry="55" fill="#F4A460" stroke="#2C1810" strokeWidth="3"/>
      <ellipse cx="100" cy="165" rx="30" ry="35" fill="#FFEFD5"/>
      
      {/* Dog Head */}
      <ellipse cx="100" cy="100" rx="40" ry="38" fill="#F4A460" stroke="#2C1810" strokeWidth="3"/>
      <ellipse cx="100" cy="105" rx="25" ry="20" fill="#FFEFD5"/>
      
      {/* Dog Ears */}
      <ellipse cx="75" cy="80" rx="15" ry="25" fill="#CD853F" stroke="#2C1810" strokeWidth="3"/>
      <ellipse cx="125" cy="80" rx="15" ry="25" fill="#CD853F" stroke="#2C1810" strokeWidth="3"/>
      
      {/* Eyes */}
      <circle cx="88" cy="95" r="8" fill="#000"/>
      <circle cx="112" cy="95" r="8" fill="#000"/>
      <circle cx="90" cy="92" r="3" fill="#FFF"/>
      <circle cx="114" cy="92" r="3" fill="#FFF"/>
      
      {/* Nose */}
      <ellipse cx="100" cy="110" rx="4" ry="3" fill="#000"/>
      
      {/* Mouth */}
      <path d="M100 115 Q95 120 90 118" stroke="#000" strokeWidth="2" fill="none"/>
      <path d="M100 115 Q105 120 110 118" stroke="#000" strokeWidth="2" fill="none"/>
      
      {/* Cheeks */}
      <circle cx="70" cy="105" r="8" fill="#FFB6C1" opacity="0.7"/>
      <circle cx="130" cy="105" r="8" fill="#FFB6C1" opacity="0.7"/>
      
      {/* Paws */}
      <ellipse cx="75" cy="220" rx="12" ry="8" fill="#FFEFD5" stroke="#2C1810" strokeWidth="2"/>
      <ellipse cx="125" cy="220" rx="12" ry="8" fill="#FFEFD5" stroke="#2C1810" strokeWidth="2"/>
      
      {/* Arms */}
      <ellipse cx="65" cy="180" rx="12" ry="25" fill="#F4A460" stroke="#2C1810" strokeWidth="2"/>
      <ellipse cx="135" cy="180" rx="12" ry="25" fill="#F4A460" stroke="#2C1810" strokeWidth="2"/>
      
      {/* Colorful Hat */}
      <ellipse cx="100" cy="70" rx="35" ry="15" fill="#FF69B4" stroke="#2C1810" strokeWidth="2"/>
      <ellipse cx="100" cy="55" rx="30" ry="12" fill="#FF1493" stroke="#2C1810" strokeWidth="2"/>
      
      {/* Hat decorations - stars and hearts */}
      <path d="M85 65 L87 70 L92 70 L88 73 L90 78 L85 75 L80 78 L82 73 L78 70 L83 70 Z" fill="#FFD700"/>
      <path d="M115 65 L117 70 L122 70 L118 73 L120 78 L115 75 L110 78 L112 73 L108 70 L113 70 Z" fill="#00FF7F"/>
      <path d="M100 60 Q95 55 100 50 Q105 55 100 60 Q100 55 105 60 Q100 65 100 60" fill="#FF6347"/>
      
      {/* Colorful Bracelet around neck */}
      <ellipse cx="100" cy="130" rx="25" ry="8" fill="none" stroke="#FF1493" strokeWidth="4"/>
      <circle cx="85" cy="130" r="3" fill="#FFD700"/>
      <circle cx="92" cy="132" r="3" fill="#00FF7F"/>
      <circle cx="100" cy="134" r="4" fill="#FF69B4"/>
      <circle cx="108" cy="132" r="3" fill="#1E90FF"/>
      <circle cx="115" cy="130" r="3" fill="#FF6347"/>
      
      {/* Tail */}
      <ellipse cx="140" cy="160" rx="8" ry="20" fill="#F4A460" stroke="#2C1810" strokeWidth="2" transform="rotate(20 140 160)"/>
    </svg>
  );
}