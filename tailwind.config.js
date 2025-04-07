/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
        extend: {
            colors: {
              purpleStart: '#A128FF',
              purpleEnd: '#6100AD',
            },
            backgroundImage: {
              'gradient-purple': 'linear-gradient(to bottom, #A128FF, #6100AD)',
            },
          },
    },
    plugins: [],
}

