import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          primary: '#ff9800',
          secondary: '#03a9f4',
          background: '#f5f5f5',
          card: '#ffffff',
          text: '#333333',
          textSecondary: '#666666',
          border: '#e0e0e0',
          button: '#ff9800',
          buttonText: '#ffffff',
          buttonHover: '#fb8c00',
        },
    },
  },
  plugins: [],
};
export default config;
