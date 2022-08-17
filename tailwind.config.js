module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#000",
        "light-white": "rgba(255,255,255,0.17)",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        slide: {
          '0%': { width: '980px', opacity: 0 },
          '100%': { width: '1000px', opacity: 1 }
        }
      },
      animation: {
        wiggle: 'wiggle .5s ease-in-out infinite',
        fade: 'fade 1s ease-in-out infinite',
        fadeOut: 'fadeOut 1s ease-in-out infinite',
        slide: 'slide 1s ease-in-out infinite'
      }
    },
    screens: {
      // 'sm': { 'min': '0px', 'max': '767px' },
      // 'md': { 'min': '768px', 'max': '1023px' },
      // 'lg': { 'min': '1024px', 'max': '1279px' },
      // 'xl': { 'min': '1280px', 'max': '1535px' },
      // '2xl': { 'min': '1536px' },
       'sm': { 'min': '0px', 'max': '767px' },
      'md': { 'min': '1023px' },
      'lg': { 'min': '1279px' },
      'xl': { 'min': '1535px' },
      '2xl': { 'min': '1536px' },
      'collapse-sidebar-md': { 'min': '0px', 'max': '1023px' },
      'hide-sidebar-sm': { 'min': '0px', 'max': '420px' },
      'md-to-opx': { 'min': '0px', 'max': '1023px' },
    },
  },
  plugins: [],
};

