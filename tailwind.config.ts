/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#fafafa",
				secondary: "#E8F1F5",
				thrid: "#005691",
				fourth: "#004a7c",
			},
		},
	},
	plugins: [],
};
