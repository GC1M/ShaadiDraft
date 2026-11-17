// Google Analytics 4 (traffic, countries, engagement time, funnels, errors) and Microsoft Clarity (heatmaps,
// session recordings, rage clicks, JS errors). IDs come from .env.production, so dev and preview builds
// without it send nothing. Both IDs are public by design; they are not secrets.
const GA = import.meta.env.VITE_GA_ID as string | undefined
const CLARITY = import.meta.env.VITE_CLARITY_ID as string | undefined

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    clarity?: Gtag
  }
}

// EEA, UK and Switzerland need consent before analytics or ad cookies. Until a consent banner (AdSense's
// "Privacy & messaging") grants it, GA sends cookieless pings there and everyone else is measured normally.
const CONSENT_REGIONS = 'AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH'.split(' ')

const load = (src: string) => document.head.appendChild(Object.assign(document.createElement('script'), { async: true, src }))

export function track(name: string, params: Record<string, string | number | boolean> = {}) {
  window.gtag?.('event', name, params)
  window.clarity?.('event', name)
}

export function initAnalytics() {
  if (GA) {
    window.dataLayer = window.dataLayer || []
    // gtag must push the arguments object itself, not an array.
    window.gtag = function () {
      window.dataLayer!.push(arguments)
    }
    const denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }
    window.gtag('consent', 'default', { ...denied, region: CONSENT_REGIONS })
    window.gtag('js', new Date())
    // Page views are sent by hand below so hash routes (#edit, #/ananya-arjun/...) count as separate pages.
    window.gtag('config', GA, { send_page_view: false })
    load(`https://www.googletagmanager.com/gtag/js?id=${GA}`)
    const pageView = () => track('page_view', { page_location: location.href, page_title: document.title })
    pageView()
    addEventListener('hashchange', pageView)
  }
  if (CLARITY) {
    window.clarity = function () {
      ;((window.clarity as unknown as { q?: unknown[] }).q ||= []).push(arguments)
    }
    load(`https://www.clarity.ms/tag/${CLARITY}`)
  }
  if (GA || CLARITY) {
    addEventListener('error', (e) => track('exception', { description: `${e.message} @ ${e.filename}:${e.lineno}`.slice(0, 150), fatal: false }))
    addEventListener('unhandledrejection', (e) => track('exception', { description: String(e.reason).slice(0, 150), fatal: false }))
  }
}
