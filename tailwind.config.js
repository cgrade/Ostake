/** @type {import('tailwindcss').Config} */
  // tailwind.config.js
  module.exports = {

    purge: [
 
      './src/**/*.html',
 
      './src/**/*.jsx',
 
    ],
     darkMode: false, // or 'media' or 'class'
     theme: {
      colors: {
        'bright': '#f35600',
        'semi-dark': '#a3c3ae',
        'dark': '#154e54',
        'white': '#fffeff'

      },
       extend: {
        fontFamily: {
          'logo' : ["Jersey 15", 'sans-serif'],
          'yara' : ["Yatra One", 'system-ui']

        }
       },
     },
     variants: {},
     plugins: [],
   }