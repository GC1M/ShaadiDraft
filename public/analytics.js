// GA4 and Clarity for the static pages (guides, design pages, hubs), so visitors who land on them from search are
// measured. Same IDs and consent defaults as src/analytics.ts, which covers the app. Only runs on the live domain.
;(function () {
  if (location.hostname !== 'shaaditemplate.com') return
  var GA = 'G-H76T6YKFL2'
  var CLARITY = 'zfac15p6dl'
  var load = function (src) {
    var s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  var denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }
  denied.region = 'AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH'.split(' ')
  window.gtag('consent', 'default', denied)
  window.gtag('js', new Date())
  window.gtag('config', GA)
  load('https://www.googletagmanager.com/gtag/js?id=' + GA)
  window.clarity = function () {
    ;(window.clarity.q = window.clarity.q || []).push(arguments)
  }
  load('https://www.clarity.ms/tag/' + CLARITY)
})()
