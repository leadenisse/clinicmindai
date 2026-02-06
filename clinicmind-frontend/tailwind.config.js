/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			DEFAULT: '8px'
  		},
  		boxShadow: {
  			sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
  		},
  		colors: {
  			/* Palette ClinicMind AI (logo) — échelles utilisables en classes */
  			primary: {
  				50: '#F0FDFA',
  				100: '#CCFBF1',
  				200: '#99F6E4',
  				300: '#5EEAD4',
  				400: '#2DD4BF',
  				500: '#14B8A6',  /* DEFAULT teal logo */
  				600: '#0D9488',
  				700: '#0F766E',
  				800: '#115E59',
  				900: '#134E4A',
  				950: '#042F2E',
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)',
  				dark: 'var(--primary-dark)',
  				light: 'var(--primary-light)'
  			},
  			navy: {
  				50: '#F0F4F8',
  				100: '#D9E2EC',
  				200: '#BCCCDC',
  				300: '#9FB3C8',
  				400: '#829AB1',
  				500: '#627D98',
  				600: '#486581',
  				700: '#334E68',
  				800: '#243B53',
  				900: '#1A3B5C',  /* Bleu marine logo */
  				950: '#102A43'
  			},
  			accent: {
  				light: '#5BBFBA',
  				DEFAULT: '#5BBFBA',
  				foreground: 'var(--accent-foreground)'
  			},
  			/* Tokens sémantiques (shadcn / composants) */
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			surface: 'var(--surface)',
  			success: 'var(--success)',
  			warning: 'var(--warning)',
  			error: 'var(--error)',
  			info: 'var(--info)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
