import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'head': '"Rubik Microbe"',
      },
    },
  },
  plugins: [],
};

export default config;