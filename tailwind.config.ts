import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // GitHub Dark Theme Colors
        github: {
          canvas: {
            default: '#0d1117',
            overlay: '#161b22',
            inset: '#010409',
            subtle: '#161b22',
          },
          border: {
            default: '#30363d',
            muted: '#21262d',
          },
          fg: {
            default: '#c9d1d9',
            muted: '#8b949e',
            subtle: '#6e7681',
          },
          accent: {
            fg: '#58a6ff',
            emphasis: '#1f6feb',
            muted: '#388bfd1a',
            subtle: '#388bfd26',
          },
          success: {
            fg: '#3fb950',
            emphasis: '#238636',
            muted: '#2ea04326',
            subtle: '#2ea04333',
          },
          attention: {
            fg: '#d29922',
            emphasis: '#9e6a03',
            muted: '#bb800926',
            subtle: '#bb800933',
          },
          danger: {
            fg: '#f85149',
            emphasis: '#da3633',
            muted: '#f8514926',
            subtle: '#f8514933',
          },
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        github: '6px',
      },
      boxShadow: {
        github: '0 0 transparent, 0 0 transparent, 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
