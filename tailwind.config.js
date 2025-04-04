
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				'50': '#E8EAF6',
  				'100': '#C5CAE9',
  				'200': '#9FA8DA',
  				'300': '#7986CB',
  				'400': '#5C6BC0',
  				'500': '#3F51B5',
  				'600': '#3949AB',
  				'700': '#303F9F',
  				'800': '#283593',
  				'900': '#1A237E',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#EDE7F6',
  				'100': '#D1C4E9',
  				'200': '#B39DDB',
  				'300': '#9575CD',
  				'400': '#7E57C2',
  				'500': '#673AB7',
  				'600': '#5E35B1',
  				'700': '#512DA8',
  				'800': '#4527A0',
  				'900': '#311B92',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#ECEFF1',
  				'100': '#CFD8DC',
  				'200': '#B0BEC5',
  				'300': '#90A4AE',
  				'400': '#78909C',
  				'500': '#607D8B',
  				'600': '#546E7A',
  				'700': '#455A64',
  				'800': '#37474F',
  				'900': '#263238',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				dark: '#263238',
  				medium: '#ECEFF1',
  				light: '#FFFFFF'
  			},
  			highlight: {
  				'50': '#E0F7FA',
  				'100': '#B2EBF2',
  				'200': '#80DEEA',
  				'300': '#4DD0E1',
  				'400': '#26C6DA',
  				'500': '#00BCD4',
  				'600': '#00ACC1',
  				'700': '#0097A7',
  				'800': '#00838F',
  				'900': '#006064',
  				DEFAULT: '#00BCD4'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'Helvetica Neue',
  				'Arial',
  				'sans-serif'
  			],
  			body: [
  				'Roboto',
  				'Arial',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			subtle: '0 2px 10px rgba(0, 0, 0, 0.05)',
  			card: '0 4px 15px rgba(0, 0, 0, 0.1)',
  			elevated: '0 8px 30px rgba(0, 0, 0, 0.12)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
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
  					height: 0
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: 1
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			fadeIn: 'fadeIn 0.5s ease-out',
  			slideUp: 'slideUp 0.5s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
  