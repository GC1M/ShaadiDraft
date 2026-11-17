import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Latin faces
import '@fontsource/cinzel/500.css'
import '@fontsource/cinzel/700.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/great-vibes/400.css'
import '@fontsource/pinyon-script/400.css'
import '@fontsource/marcellus/400.css'
import '@fontsource/bodoni-moda/400.css'
import '@fontsource/bodoni-moda/400-italic.css'
import '@fontsource/bodoni-moda/700.css'
import '@fontsource/jost/400.css'
import '@fontsource/jost/500.css'
import '@fontsource/mulish/400.css'
import '@fontsource/mulish/600.css'
// One body + one display face per Indian script; unicode-range keeps unused subsets from loading.
import '@fontsource/tiro-devanagari-hindi/400.css'
import '@fontsource/tiro-devanagari-marathi/400.css'
import '@fontsource/amita/400.css'
import '@fontsource/amita/700.css'
import '@fontsource/noto-serif-gujarati/400.css'
import '@fontsource/noto-serif-gujarati/700.css'
import '@fontsource/farsan/400.css'
import '@fontsource/tiro-gurmukhi/400.css'
import '@fontsource/baloo-paaji-2/600.css'
import '@fontsource/tiro-tamil/400.css'
import '@fontsource/arima/600.css'
import '@fontsource/amiri/400.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
