import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		colors: {
    			'deep-blue': 'var(--color-deep-blue)',
    			'calm-teal': 'var(--color-calm-teal)',
    			'sky-blue': 'var(--color-sky-blue)',
    			'soft-blue': 'var(--color-soft-blue)',
    			'pale-blue': 'var(--color-pale-blue)',
    			background: 'var(--background)',
    			foreground: 'var(--foreground)',
    			primary: 'var(--primary-color)',
    			secondary: 'var(--secondary-color)',
    			highlight1: 'var(--highlight1-color)',
    			highlight2: 'var(--highlight2-color)',
    			card: 'var(--card-background)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
