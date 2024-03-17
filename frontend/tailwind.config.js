/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  
    colors:{
      'coffee':{
        light: '#E6CCB2',
        DEFAULT: '#EDE0D4',
        dark:'#B08968'
      }
    }  ,
    extend: {},
  },
  plugins: [],
}

