import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    extend: {
      spacing: {
        "96": "24rem",
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
} satisfies Config;
