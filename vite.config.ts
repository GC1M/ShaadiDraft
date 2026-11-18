import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { defineConfig, runnerImport, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Renders the gallery header and hero (src/Hero.tsx) into index.html's <!-- app-hero --> placeholder, so the static
// shell and the React app share one source and can't drift apart (a mismatch shows up as layout shift).
function prerenderHero(): Plugin {
  let base = '/'
  return {
    name: 'prerender-hero',
    configResolved: (c) => void (base = c.base),
    transformIndexHtml: {
      order: 'post', // after Vite's own URL rewriting, which would try to resolve the public-dir image paths
      async handler(html) {
        const { module } = await runnerImport<typeof import('./src/Hero')>('/src/Hero.tsx', { configFile: false, logLevel: 'error', base })
        return html.replace('<!-- app-hero -->', renderToStaticMarkup(createElement(module.Hero, { intro: true })))
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderHero()],
})
