import { getFontEmbedCSS, toJpeg } from 'html-to-image'
import { jsPDF } from 'jspdf'

// Each direct child of `container` is one CARD_W x CARD_H page rendered at full size.
// Returns one JPEG data URL per page.
export async function capturePages(container: HTMLElement, pixelRatio: number) {
  await document.fonts.ready
  // Embed fonts once and reuse for every page instead of re-fetching per capture.
  const fontEmbedCSS = await getFontEmbedCSS(container)
  const pages = Array.from(container.children) as HTMLElement[]
  // Safari often paints fonts blank on the first capture; a cheap throwaway pass warms it up.
  await toJpeg(pages[0], { pixelRatio: 1, fontEmbedCSS })
  const images: string[] = []
  for (const el of pages) {
    images.push(await toJpeg(el, { pixelRatio, quality: 0.9, fontEmbedCSS, backgroundColor: '#ffffff' }))
  }
  return images
}

export async function buildPdf(container: HTMLElement) {
  // 4x ≈ 305 DPI on desktop; 3x ≈ 230 DPI on touch devices to stay within low-end phone memory.
  const images = await capturePages(container, matchMedia('(pointer: coarse)').matches ? 3 : 4)
  const pdf = new jsPDF({ unit: 'mm', format: 'a5', compress: true })
  images.forEach((img, i) => {
    if (i) pdf.addPage('a5')
    pdf.addImage(img, 'JPEG', 0, 0, 148, 210)
  })
  return pdf
}

// 3x (1332 x 1890) is already above what WhatsApp keeps after its own compression.
export async function buildImages(container: HTMLElement, baseName: string) {
  const images = await capturePages(container, 3)
  return Promise.all(
    images.map(async (url, i) => {
      const blob = await (await fetch(url)).blob()
      return new File([blob], `${baseName}-${i + 1}.jpg`, { type: 'image/jpeg' })
    }),
  )
}
