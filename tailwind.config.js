import withMT from '@material-tailwind/react/utils/withMT';
import { defineConfig } from 'vite';
import plugin from 'tailwindcss/plugin';

const myClass=plugin(({ addUtilities })=>{
  addUtilities({
    '@keyframes rotate360': {
      '0%': {
        transform: 'rotateY(0deg)',
      },
      '100%': {
        transform: 'rotateY(360deg)',
      },
    },
    '.my-rotate-y-360': {
      animation: 'rotate360 2s linear infinite', 
    },
  });
});

const scrollBar=plugin(({ addUtilities })=>{
  addUtilities({
    '.scrollbar-thin':{
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgb(31 29 29) black'
    },
    '.scrollbar-webkit':{
      '&::-webkit-scrollbar':{
        width: '8px'
      },
      '&::-webkit-scrollbar-track':{
        background: 'white',
        borderRadius: '20px'
      },
      '&::-webkit-scrollbar-thumb':{
        backgroundColor: 'rgb(31 41 55)',
        borderRadius: '20px',
        border: '1px solid white'
      }

    }
  })
});

export default defineConfig(
  withMT({
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
      './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
      './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [myClass, scrollBar],
  })
);
