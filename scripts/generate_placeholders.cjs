const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const photos = [
  { name: 'memory-01.jpg', title: 'Memory 1', subtitle: 'The Beginning', color1: '#E8D5C4', color2: '#FFF1E6' },
  { name: 'memory-02.jpg', title: 'Memory 2', subtitle: 'Warm Moments', color1: '#D8E2DC', color2: '#ECE4DB' },
  { name: 'memory-03.jpg', title: 'Memory 3', subtitle: 'Adventures', color1: '#FFE5D9', color2: '#FFCAD4' },
  { name: 'memory-04.jpg', title: 'Memory 4', subtitle: 'Laughter', color1: '#F4ACB7', color2: '#FFE5EC' },
  { name: 'memory-05.jpg', title: 'Memory 5', subtitle: 'Moments That Matter', color1: '#E2ECE9', color2: '#DFE7FD' },
  { name: 'memory-06.jpg', title: 'Memory 6', subtitle: 'Treasured Days', color1: '#FDE2E4', color2: '#FFF1E6' },
  { name: 'memory-07.jpg', title: 'Memory 7', subtitle: 'Endless Smiles', color1: '#E8E8E4', color2: '#F0EFEB' },
  { name: 'memory-08.jpg', title: 'Memory 8', subtitle: 'A True Friend', color1: '#DFE7FD', color2: '#FCE1E4' },
  { name: 'memory-09.jpg', title: 'Memory 9', subtitle: 'Cherished Bond', color1: '#F8EDEB', color2: '#F7D6E0' },
  { name: 'final-birthday-photo.jpg', title: 'Happy Birthday', subtitle: 'The Star of the Day', color1: '#FFE5D9', color2: '#DFBA52' },
];

function generateSvg(title, subtitle, color1, color2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <rect width="800" height="1000" fill="url(#bg)"/>
  
  <!-- Subtle ornate watermark pattern -->
  <circle cx="400" cy="500" r="280" fill="url(#glow)"/>
  <circle cx="400" cy="500" r="240" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6"/>
  <circle cx="400" cy="500" r="220" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.4"/>
  
  <!-- Ornate Golden Corners -->
  <path d="M 40,80 L 40,40 L 80,40" fill="none" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="40" cy="40" r="4" fill="#D4AF37"/>
  <path d="M 760,80 L 760,40 L 720,40" fill="none" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="760" cy="40" r="4" fill="#D4AF37"/>
  <path d="M 40,920 L 40,960 L 80,960" fill="none" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="40" cy="960" r="4" fill="#D4AF37"/>
  <path d="M 760,920 L 760,960 L 720,960" fill="none" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="760" cy="960" r="4" fill="#D4AF37"/>

  <!-- Inner ornate border -->
  <rect x="50" y="50" width="700" height="900" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.7" rx="8"/>
  <rect x="60" y="60" width="680" height="880" fill="none" stroke="#C5A059" stroke-width="0.8" opacity="0.4" rx="6"/>

  <!-- Center Icon: Royal Crown & Sparkles -->
  <g transform="translate(400, 420)">
    <!-- Crown -->
    <path d="M -45,-10 L -30,-45 L 0,-25 L 30,-45 L 45,-10 L 35,15 L -35,15 Z" fill="#D4AF37" opacity="0.85"/>
    <circle cx="-30" cy="-48" r="4" fill="#FFF"/>
    <circle cx="0" cy="-28" r="4" fill="#FFF"/>
    <circle cx="30" cy="-48" r="4" fill="#FFF"/>
    <!-- Heart underneath -->
    <path d="M 0,42 C -18,22 -38,36 -28,54 C -18,72 0,86 0,86 C 0,86 18,72 28,54 C 38,36 18,22 0,42 Z" fill="#C98A7D" opacity="0.8"/>
  </g>

  <!-- Typography -->
  <text x="400" y="580" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="34" font-weight="700" fill="#2D231E" text-anchor="middle" letter-spacing="2">
    ${title}
  </text>
  <text x="400" y="625" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="500" fill="#8A7A72" text-anchor="middle" letter-spacing="1">
    ${subtitle}
  </text>
  
  <text x="400" y="700" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="400" fill="#997328" text-anchor="middle" opacity="0.85">
    ✦ Replace with your photo in public/images/ ✦
  </text>
</svg>`;
}

photos.forEach(p => {
  const filePath = path.join(dir, p.name);
  const svgContent = generateSvg(p.title, p.subtitle, p.color1, p.color2);
  // Write as SVG markup (which browser can display if served or with data url fallback)
  fs.writeFileSync(filePath, svgContent, 'utf8');
});

console.log('Successfully created all 10 placeholder image assets!');

