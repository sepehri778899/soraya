import React from 'react';

interface CelestialBackgroundProps {
  hoveredPillar?: string | null;
}

export const CelestialBackground: React.FC<CelestialBackgroundProps> = ({ hoveredPillar }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 
        Full-Screen Animated SVG Gradient Mesh & Astrolabe
        Utilizes hardware-accelerated SVG animations (<animate> and <animateTransform>)
        for silky-smooth, low-CPU organic motion.
      */}
      <svg
        className="w-full h-full absolute inset-0 preserve-3d"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Pillar 1: Emerald Aura (Workforce) - Organic Slow Drifting Coordinates */}
          <radialGradient id="cg-emerald" cx="28%" cy="22%" r="48%">
            <animate attributeName="cx" values="28%;38%;22%;28%" dur="26s" repeatCount="indefinite" />
            <animate attributeName="cy" values="22%;32%;16%;22%" dur="24s" repeatCount="indefinite" />
            <animate attributeName="r" values="48%;56%;44%;48%" dur="30s" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#EAF7F0" stopOpacity={hoveredPillar === 'workforce' ? "0.9" : "0.55"} />
            <stop offset="45%" stopColor="#d4f0df" stopOpacity={hoveredPillar === 'workforce' ? "0.6" : "0.25"} />
            <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
          </radialGradient>

          {/* Pillar 2: Amber Aura (Services & Needs) - Drifting Bottom-Right */}
          <radialGradient id="cg-amber" cx="25%" cy="78%" r="46%">
            <animate attributeName="cx" values="25%;18%;32%;25%" dur="28s" repeatCount="indefinite" />
            <animate attributeName="cy" values="78%;86%;68%;78%" dur="26s" repeatCount="indefinite" />
            <animate attributeName="r" values="46%;54%;42%;46%" dur="32s" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#FFF8E8" stopOpacity={hoveredPillar === 'services' ? "0.9" : "0.5"} />
            <stop offset="50%" stopColor="#fef0c7" stopOpacity={hoveredPillar === 'services' ? "0.55" : "0.22"} />
            <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
          </radialGradient>

          {/* Pillar 3: Azure Aura (Coaches) - Drifting Bottom-Left */}
          <radialGradient id="cg-azure" cx="76%" cy="75%" r="46%">
            <animate attributeName="cx" values="76%;84%;68%;76%" dur="30s" repeatCount="indefinite" />
            <animate attributeName="cy" values="75%;66%;82%;75%" dur="25s" repeatCount="indefinite" />
            <animate attributeName="r" values="46%;52%;40%;46%" dur="28s" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#EBF3FF" stopOpacity={hoveredPillar === 'coaches' ? "0.9" : "0.5"} />
            <stop offset="50%" stopColor="#dbeafe" stopOpacity={hoveredPillar === 'coaches' ? "0.55" : "0.22"} />
            <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
          </radialGradient>

          {/* Pillar 4: Amethyst Aura (Training Topics) - Drifting Top-Left */}
          <radialGradient id="cg-amethyst" cx="74%" cy="24%" r="48%">
            <animate attributeName="cx" values="74%;66%;82%;74%" dur="27s" repeatCount="indefinite" />
            <animate attributeName="cy" values="24%;16%;32%;24%" dur="29s" repeatCount="indefinite" />
            <animate attributeName="r" values="48%;56%;42%;48%" dur="31s" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#F3EEFF" stopOpacity={hoveredPillar === 'training' ? "0.9" : "0.55"} />
            <stop offset="50%" stopColor="#ede9fe" stopOpacity={hoveredPillar === 'training' ? "0.6" : "0.25"} />
            <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
          </radialGradient>

          {/* Center Nexus Core Glowing Gradient */}
          <radialGradient id="cg-nexus-core" cx="50%" cy="50%" r="50%">
            <animate attributeName="r" values="40%;60%;40%" dur="12s" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f5f5f4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
          </radialGradient>

          {/* Dynamic Light Stream for Orbital Lines */}
          <linearGradient id="orbit-stream" x1="0%" y1="0%" x2="100%" y2="100%">
            <animate attributeName="x1" values="0%;100%;0%" dur="18s" repeatCount="indefinite" />
            <animate attributeName="y1" values="0%;100%;0%" dur="22s" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#97d4b4" stopOpacity="0.3" />
            <stop offset="35%" stopColor="#e9c878" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#9ec1f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#caaaf7" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Ambient Moving Gradient Rectangles */}
        <rect width="100%" height="100%" fill="#faf9f6" />
        <rect width="100%" height="100%" fill="url(#cg-emerald)" />
        <rect width="100%" height="100%" fill="url(#cg-amethyst)" />
        <rect width="100%" height="100%" fill="url(#cg-amber)" />
        <rect width="100%" height="100%" fill="url(#cg-azure)" />
        <rect width="100%" height="100%" fill="url(#cg-nexus-core)" />
      </svg>

      {/* 
        Central Rotating Astrolabe & Celestial Constellation Orbits
        Fixed aspect ratio SVG centered in the viewport with slow 160-second rotation.
      */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-[0.35] pointer-events-none">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Group 1: Counter-Clockwise Ultra-Slow Rotating Rings (240s) */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 400 400"
              to="0 400 400"
              dur="240s"
              repeatCount="indefinite"
            />
            {/* Outer dotted orbital ring with coordinate ticks */}
            <circle cx="400" cy="400" r="380" stroke="url(#orbit-stream)" strokeWidth="1" strokeDasharray="3 7" />
            <circle cx="400" cy="400" r="340" stroke="#a8a29e" strokeWidth="0.8" strokeDasharray="1 8" />

            {/* Orbital markers */}
            <circle cx="400" cy="20" r="3" fill="#1e7046" opacity="0.6" />
            <circle cx="780" cy="400" r="3" fill="#925807" opacity="0.6" />
            <circle cx="400" cy="780" r="3" fill="#1d4ed8" opacity="0.6" />
            <circle cx="20" cy="400" r="3" fill="#6d28d9" opacity="0.6" />
          </g>

          {/* Group 2: Clockwise Rotating Celestial Sphere Rings (180s) */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 400 400"
              to="360 400 400"
              dur="180s"
              repeatCount="indefinite"
            />
            {/* Mid ring */}
            <circle cx="400" cy="400" r="280" stroke="#78716c" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="400" cy="400" r="210" stroke="#a8a29e" strokeWidth="1.2" />

            {/* Inner dashed ring */}
            <circle cx="400" cy="400" r="130" stroke="#d6d3d1" strokeWidth="1.2" strokeDasharray="4 6" />
            <circle cx="400" cy="400" r="65" stroke="url(#orbit-stream)" strokeWidth="1.5" strokeDasharray="2 4" />

            {/* Planetary Nodes along orbits */}
            <circle cx="400" cy="190" r="3.5" fill="#1e7046">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="610" cy="400" r="3.5" fill="#925807">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="4.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="610" r="3.5" fill="#1d4ed8">
              <animate attributeName="opacity" values="0.3;0.85;0.3" dur="3.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="400" r="3.5" fill="#6d28d9">
              <animate attributeName="opacity" values="0.4;0.95;0.4" dur="4.6s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Static Astrolabe Cardinal Axes */}
          <line x1="400" y1="15" x2="400" y2="785" stroke="#d6d3d1" strokeWidth="0.9" strokeDasharray="5 7" />
          <line x1="15" y1="400" x2="785" y2="400" stroke="#d6d3d1" strokeWidth="0.9" strokeDasharray="5 7" />
          <line x1="135" y1="135" x2="665" y2="665" stroke="#e7e5e4" strokeWidth="0.75" strokeDasharray="3 5" />
          <line x1="665" y1="135" x2="135" y2="665" stroke="#e7e5e4" strokeWidth="0.75" strokeDasharray="3 5" />

          {/* Pleiades (خوشه پروین / ثریا) Star Cluster in Center */}
          <g>
            <circle cx="400" cy="400" r="4.5" fill="#1e7046">
              <animate attributeName="r" values="3.5;5;3.5" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="426" cy="384" r="3.5" fill="#925807">
              <animate attributeName="opacity" values="0.5;0.95;0.5" dur="3.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="372" cy="416" r="3.5" fill="#1d4ed8">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="414" cy="428" r="4" fill="#6d28d9">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="382" cy="374" r="3" fill="#eab308">
              <animate attributeName="opacity" values="0.3;0.85;0.3" dur="4.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="438" cy="412" r="2.5" fill="#10b981">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="362" cy="392" r="2.8" fill="#8b5cf6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4.2s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
};
