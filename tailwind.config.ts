import type { Config } from 'tailwindcss';

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
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            code: {
              counterReset: 'line',
            },

            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
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
              paddingRight: 0,
              paddingLeft: 0,
              color: 'var(--shiki-light)',
              backgroundColor: 'var(--shiki-light-bg)',
              border: '1px solid #e5e7eb',  // tailwind gray-200
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
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border-color)',
              borderBottom: 'none',
              borderRadius: '0.5rem 0.5rem 0 0',
            },
            '.prose figcaption[data-rehype-pretty-code-title] + pre': {
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
              padding: '0.2em 0.5em',
              overflowWrap: 'break-word',
              borderRadius: '4px',
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
  plugins: [require('@tailwindcss/typography')],
};
export default config;
