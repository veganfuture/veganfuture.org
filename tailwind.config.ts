import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'leaf-pattern': "url('/vf_texture.png')",
      },      
      colors: {
        green: {
          100: '#f7fcfa',
          200: '#e7f1ed',
          300: '#b3dfc7',
          800: '#337a60',
        },
      },
    },
  },
  plugins: [],
};
export default config;
