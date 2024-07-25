import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'ozonetel':'0px 4px 4px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

