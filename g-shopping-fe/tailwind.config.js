/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				dark: {
					bg1: "rgb(var(--dark-bg-primary) / <alpha-value>)",
					bg2: "rgb(var(--dark-bg-secondary) / <alpha-value>)",
					base: "rgb(var(--dark-bg-base) / <alpha-value>)",
					form: "rgb(var(--dark-bg-form) / <alpha-value>)",
					linebase: "rgb(var(--dark-line-base) / <alpha-value>)",
				},
				primary: "rgb(var(--primary) / <alpha-value>)",
				secondary: "rgb(var(--secondary) / <alpha-value>)",
				textlighter: "rgb(var(--text-lighter) / <alpha-value>)",
				textlight: "rgb(var(--text-light) / <alpha-value>)",
				textdark: "rgb(var(--text-dark) / <alpha-value>)",
				textgray: "rgb(var(--text-gray) / <alpha-value>)",
			},
			screens: {
				xs: "475px",
				base: "1194px",
				"2xl": "1400px",
			},
		},
	},
	plugins: [],
};
