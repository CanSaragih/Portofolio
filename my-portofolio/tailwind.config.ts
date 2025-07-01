import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // pastikan sesuai foldermu
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["var(--font-prompt)"],
        sevillana: ["var(--font-sevillana)"],
        kanit: ["var(--font-kanit)"],
      },
    },
  },
  plugins: [],
};

export default config;
