import localFont from 'next/font/local';

export const rift = localFont({
  src: [
    {
      path: '../../../public/fonts/Rift.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/Rift_Bold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
});

export const orbitron = localFont({
  src: [
    {
      path: '../../../public/fonts/Orbitron-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/Orbitron-Bold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
});

export const rubik = localFont({
  src: [
    {
      path: '../../../public/fonts/Rubik-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/Rubik-Bold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
});
