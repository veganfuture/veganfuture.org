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
          100: '#e7f1ed', // your custom green-100
          200: '#b3dfc7', // your custom green-200
        },
      },
    },
  },
  plugins: [],
};
export default config;
