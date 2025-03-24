import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  prefix: '',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'var(--background)',
        'background-opacity': 'var(--background-opacity)',
        foreground: 'var(--foreground)',
        main: 'var(--text-color)',
        sub: 'var(--text-secondary-color)',
        impact: 'var(--impact-color)',
        light: 'var(--border-color)',
        'gray0': 'var(--gray0)',
        'gray1': 'var(--gray1)',
        'gray2': 'var(--gray2)',
        'gray3': 'var(--gray3)',
        'gray4': 'var(--gray4)',
        'gray5': 'var(--gray5)',
      },
      fontFamily: {
        pretendard: ['Pretendard Variable', ...fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            h2: {
              borderLeft: '4px solid var(--impact-color)',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--gray5)',
            },
            h3: {
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              fontSize: '1.1rem',
              color: 'var(--text-color)',
            },
            p: {
              margin: '0.5rem 0',
              color: 'var(--text-secondary-color)',
            },
            code: {
              counterReset: 'line',
            },
            img: {
              borderRadius: '0.5rem',
              maxHeight: '600px',
            },
            '.prose :where(strong):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              // marginRight: '-0.2rem',
              color: 'var(--text-color)',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            '.prose :where(h2):not(:where([class~="not-prose"],[class~="not-prose"] *))':{
              marginTop: '5rem',
              marginBottom: '1.5rem',
              color: 'var(--text-color)',
              fontSize: '1.25rem',
            },
            '.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              textDecoration: 'none',
              position: 'relative',
              color: 'var(--impact-color)',
            },
            '.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *)):hover': {
              borderBottom: '1px solid var(--impact-color)',
            },
            '.prose :where(pre code span):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              fontFamily: 'monospace',
            },
            '.prose :where(blockquote):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              border: 'none',
              padding: '0.25rem 1rem',
              fontStyle: 'normal',
              backgroundColor: 'var(--border-color)',
              borderRadius: '0.5rem',

            },
            '.prose code[data-line-numbers]': {
              counterReset: 'line',
            },
            'code[data-line-numbers] > [data-line]::before': {
              counterIncrement: 'line',
              content: 'counter(line)',
              display: 'inline-block',
              width: '1rem',
              marginRight: '1.5rem',
              textAlign: 'right',
              color: 'grey',
              fontSize: '0.75rem',
            },
            'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
              width: '1rem',
            },
            'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
              width: '2rem',
            },

            pre: {
              fontFamily: 'ui-monospace',
              paddingRight: 0,
              paddingLeft: 0,
              margin: '0.5rem 2rem 1rem 1rem',
              color: 'var(--shiki-light)',
              backgroundColor: 'var(--shiki-light-bg)',
              border: '1px solid #e5e7eb', // tailwind gray-200
            },
            '.dark pre': {
              backgroundColor: 'var(--shiki-dark-bg)',
              color: 'var(--shiki-dark)',
              border: '1px solid #374151',
            },
            'pre > code > span': {
              paddingLeft: '1rem',
              paddingRight: '1rem',
            },
            'pre code span': {
              color: 'var(--shiki-light)',
            },
            '.dark pre code span': {
              color: 'var(--shiki-dark)',
            },
            '[data-highlighted-line]': {
              backgroundColor: 'rgba(249, 209, 130, 0.3)',
            },
            '.prose figcaption[data-rehype-pretty-code-title]': {
              padding: '0.5rem 1rem',
              margin: '0 2rem 0 1rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border-color)',
              borderBottom: 'none',
              borderRadius: '0.5rem 0.5rem 0 0',
            },
            '.prose figcaption[data-rehype-pretty-code-title] + div pre': {
              marginTop: 0,
              borderRadius: '0 0 0.5rem 0.5rem',
            },
            ':not(pre) > code': {
              fontWeight: 600,
              position: 'relative',
              bottom: 1,
              margin: '0 2px',
              color: 'rgb(234, 88, 12)',
              backgroundColor: 'rgba(135,131,120,0.15)',
              padding: '0.2rem 0.4rem',
              overflowWrap: 'break-word',
              borderRadius: '4px',
            },
            '.prose :where(figure):not(:where([class~="not-prose"],[class~="not-prose"] *))': {
              margin: '0.5rem 0',
            },

            u: {
              textUnderlineOffset: '4px',
              textDecorationThickness: 1,
              fontWeight: 600,
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
