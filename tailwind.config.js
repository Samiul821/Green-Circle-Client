// tailwind.config.js
module.exports = {
  // ...
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "primary": "#570df8",
          "secondary": "#f000b8",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#f0f4f8",     // light theme এর background color (custom)
          // যদি image দিতে চাও, tailwind দিয়ে নয়, CSS এ দাও
        },
      },
      "dark", // dark theme default নেয়া
    ],
  },
};
