/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				button: {
					green: "rgb(var(--button-green) / <alpha-value>)",
					red: "rgb(var(--button-red) / <alpha-value>)",
					hover1: "rgb(var(--button-hover1) / <alpha-value>)",
					hover2: "rgb(var(--button-hover2) / <alpha-value>)",
				},
				primary: {
					base: "rgb(var(--primary) / <alpha-value>)",
					dark: "rgb(var(--primary-dark) / <alpha-value>)",
				},
				secondary: {
					base: "rgb(var(--secondary) / <alpha-value>)",
					light: "rgb(var(--secondary-light) / <alpha-value>)",
					red: "rgb(var(--secondary-red) / <alpha-value>)",
				},
				text: {
					base: "rgb(var(--text) / <alpha-value>)",
					dark: "rgb(var(--text-dark) / <alpha-value>)",
					gray: "rgb(var(--text-gray) / <alpha-value>)",
				},
			},
			screens: {
				xs: "475px",
				"2xl": "1400px",
				"3xl": "1600px",
			},
		},
	},
	plugins: [],
};
