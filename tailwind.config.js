/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-cream': '#FFF5F7',      // More pinkish/rosy cream
        'soft-pink': '#FCE4EC',       // Light romantic pink
        'blush-pink': '#F8BBD0',      // Deeper blush
        'soft-lavender': '#E1BEE7',   // Romantic lavender
        'deep-warm': '#6B2737',       // A warmer, romantic deep red/brown
        'text-muted': '#A0525A',      // Soft dark rose text
        'accent-sage': '#DFE5D3',
        'love-rose': '#FF8E9E',
        'warm-peach': '#FFE0B2',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        cursive: ['Dancing Script', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'heartbeat': 'heartpulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartpulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
