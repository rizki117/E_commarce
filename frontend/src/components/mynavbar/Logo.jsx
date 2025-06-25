import React from 'react';

const Logo = ({ 
  width = 120, 
  height = 36, 
  className = "",
  responsive = true 
}) => {
  // Style untuk responsive
  const responsiveStyle = responsive ? {
    width: '100%',
    height: 'auto',
    maxWidth: `${width}px`,
    maxHeight: `${height}px`
  } : {
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <svg 
      viewBox="0 0 200 60" 
      xmlns="http://www.w3.org/2000/svg" 
      style={responsiveStyle}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Enhanced gradient dengan lebih banyak warna */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#667eea", stopOpacity:1}} />
          <stop offset="25%" style={{stopColor:"#764ba2", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#f093fb", stopOpacity:1}} />
          <stop offset="75%" style={{stopColor:"#f5576c", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#4facfe", stopOpacity:1}} />
        </linearGradient>
        
        {/* Animated gradient */}
        <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#667eea", stopOpacity:1}}>
            <animate attributeName="stop-color" 
                     values="#667eea;#764ba2;#f093fb;#f5576c;#4facfe;#667eea" 
                     dur="8s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" style={{stopColor:"#f093fb", stopOpacity:1}}>
            <animate attributeName="stop-color" 
                     values="#f093fb;#f5576c;#4facfe;#667eea;#764ba2;#f093fb" 
                     dur="8s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style={{stopColor:"#4facfe", stopOpacity:1}}>
            <animate attributeName="stop-color" 
                     values="#4facfe;#667eea;#764ba2;#f093fb;#f5576c;#4facfe" 
                     dur="8s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        
        {/* Text gradient dengan shimmer effect */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#f8f9ff", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#ffffff", stopOpacity:1}} />
          <animateTransform attributeName="gradientTransform" 
                           type="translate" 
                           values="-200,0;200,0;-200,0" 
                           dur="3s" 
                           repeatCount="indefinite"/>
        </linearGradient>
        
        {/* Icon gradient yang lebih vibrant */}
        <radialGradient id="iconGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:1}} />
          <stop offset="70%" style={{stopColor:"#ffd700", stopOpacity:0.9}} />
          <stop offset="100%" style={{stopColor:"#ff6b35", stopOpacity:0.8}} />
        </radialGradient>
        
        {/* Enhanced shadow dengan blur yang lebih soft */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00000040"/>
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00000020"/>
        </filter>
        
        {/* Advanced glow effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Neon glow untuk teks */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feGaussianBlur stdDeviation="4" result="bigBlur"/>
          <feMerge> 
            <feMergeNode in="bigBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Pattern untuk texture */}
        <pattern id="dots" patternUnits="userSpaceOnUse" width="10" height="10">
          <circle cx="5" cy="5" r="1" fill="#ffffff" opacity="0.1"/>
        </pattern>
      </defs>
      
      {/* Background utama dengan animasi */}
      <rect x="5" y="5" width="190" height="50" rx="25" ry="25" 
            fill="url(#animatedGradient)" 
            filter="url(#shadow)"
            opacity="0.95">
        <animate attributeName="rx" values="25;30;25" dur="4s" repeatCount="indefinite"/>
      </rect>
      
      {/* Background overlay dengan pattern */}
      <rect x="5" y="5" width="190" height="50" rx="25" ry="25" 
            fill="url(#dots)" 
            opacity="0.3"/>
      
      {/* Highlight strip di bagian atas */}
      <rect x="5" y="5" width="190" height="15" rx="25" ry="25" 
            fill="url(#textGradient)" 
            opacity="0.2"/>
      
      {/* Enhanced shopping cart icon - kiri */}
      <g transform="translate(25, 22)" filter="url(#glow)">
        {/* Cart body dengan styling modern */}
        <path d="M1 6 L14 6 L13.5 16 C13.5 17.5 12.5 18.5 11 18.5 L4 18.5 C2.5 18.5 1.5 17.5 1.5 16 L1 6 Z" 
              fill="url(#iconGradient)" 
              stroke="#ffffff" 
              strokeWidth="0.5" 
              opacity="0.9"/>
        
        {/* Cart handle dengan animasi */}
        <path d="M5 6 L5 4 C5 2.5 6 1.5 7.5 1.5 C9 1.5 10 2.5 10 4 L10 6" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              opacity="0.9">
          <animate attributeName="stroke-width" values="1.5;2;1.5" dur="2s" repeatCount="indefinite"/>
        </path>
        
        {/* Animated wheels */}
        <circle cx="5.5" cy="13" r="1" fill="#ffffff">
          <animate attributeName="r" values="1;1.2;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="9.5" cy="13" r="1" fill="#ffffff">
          <animate attributeName="r" values="1;1.2;1" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
        </circle>
        
        {/* Sparkle effect */}
        <g opacity="0.7">
          <path d="M12 3 L13 5 L15 4 L13 6 L12 8 L11 6 L9 4 L11 5 Z" fill="#ffd700">
            <animateTransform attributeName="transform" 
                             type="rotate" 
                             values="0 12 5;360 12 5" 
                             dur="6s" 
                             repeatCount="indefinite"/>
          </path>
        </g>
      </g>
      
      {/* Enhanced shopping cart icon - kanan */}
      <g transform="translate(155, 22)" filter="url(#glow)" opacity="0.6">
        <path d="M1 6 L14 6 L13.5 16 C13.5 17.5 12.5 18.5 11 18.5 L4 18.5 C2.5 18.5 1.5 17.5 1.5 16 L1 6 Z" 
              fill="url(#iconGradient)" 
              stroke="#ffffff" 
              strokeWidth="0.5"/>
        
        <path d="M5 6 L5 4 C5 2.5 6 1.5 7.5 1.5 C9 1.5 10 2.5 10 4 L10 6" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="1.5" 
              strokeLinecap="round"/>
        
        <circle cx="5.5" cy="13" r="1" fill="#ffffff"/>
        <circle cx="9.5" cy="13" r="1" fill="#ffffff"/>
      </g>
      
      {/* Enhanced text "OkYaKu" dengan effects yang lebih dramatis */}
      <g transform="translate(100, 35)" filter="url(#neonGlow)">
        {/* Background text untuk depth */}
        <text x="-32" y="0" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" 
              fontSize="20" fontWeight="900" fill="#000000" textAnchor="middle" opacity="0.3">
          Ok
        </text>
        <text x="0" y="0" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" 
              fontSize="20" fontWeight="900" fill="#000000" textAnchor="middle" opacity="0.3">
          Ya
        </text>
        <text x="32" y="0" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" 
              fontSize="20" fontWeight="900" fill="#000000" textAnchor="middle" opacity="0.3">
          Ku
        </text>
        
        {/* Main text dengan animasi */}
        <text x="-32" y="-2" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" 
              fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">
          Ok
          <animate attributeName="fill" 
                   values="#ffffff;#ffd700;#ffffff" 
                   dur="3s" 
                   repeatCount="indefinite"/>
        </text>
        
        <text x="0" y="-2" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" 
              fontSize="20" fontWeight="900" fill="#ffd700" textAnchor="middle">
          Ya
          <animate attributeName="fill" 
                   values="#ffd700;#ff6b35;#ffd700" 
                   dur="3s" 
                   repeatCount="indefinite" 
                   begin="1s"/>
        </text>
        
        <text x="32" y="-2" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" 
              fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">
          Ku
          <animate attributeName="fill" 
                   values="#ffffff;#4facfe;#ffffff" 
                   dur="3s" 
                   repeatCount="indefinite" 
                   begin="2s"/>
        </text>
      </g>
      
      {/* Floating particles dengan berbagai ukuran */}
      <g opacity="0.6">
        <circle cx="40" cy="20" r="1.5" fill="#ffd700">
          <animate attributeName="cy" values="20;15;20" dur="4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="160" cy="40" r="1" fill="#ff6b35">
          <animate attributeName="cx" values="160;165;160" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="r" values="1;2;1" dur="3s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="50" cy="45" r="0.8" fill="#4facfe">
          <animate attributeName="cy" values="45;40;45" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite"/>
        </circle>
        
        <circle cx="150" cy="15" r="1.2" fill="#ffffff">
          <animate attributeName="r" values="1.2;0.5;1.2" dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      {/* Subtle geometric shapes untuk modern touch */}
      <g opacity="0.1">
        <polygon points="35,12 40,8 45,12 40,16" fill="#ffffff">
          <animateTransform attributeName="transform" 
                           type="rotate" 
                           values="0 40 12;360 40 12" 
                           dur="10s" 
                           repeatCount="indefinite"/>
        </polygon>
        
        <rect x="155" y="35" width="6" height="6" fill="#ffd700" transform="rotate(45 158 38)">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/>
        </rect>
      </g>
    </svg>
  );
};

export default Logo;