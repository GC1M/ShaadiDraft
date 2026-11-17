import { getFontEmbedCSS, toJpeg } from 'html-to-image'
import { jsPDF } from 'jspdf'

// Each direct child of `container` is one CARD_W x CARD_H page rendered at full size.
export async function buildPdf(container: HTMLElement) {
  await document.fonts.ready
  // Embed fonts once and reuse for every page instead of re-fetching per capture.
  const fontEmbedCSS = await getFontEmbedCSS(container)
  const pdf = new jsPDF({ unit: 'mm', format: 'a5', compress: true })
  const pages = Array.from(container.children) as HTMLElement[]
  // Safari often paints fonts blank on the first capture; a cheap throwaway pass warms it up.
  await toJpeg(pages[0], { pixelRatio: 1, fontEmbedCSS })
  // 4x ≈ 305 DPI on desktop; 3x ≈ 230 DPI on touch devices to stay within low-end phone memory.
  const pixelRatio = matchMedia('(pointer: coarse)').matches ? 3 : 4
  for (const [i, el] of pages.entries()) {
    const img = await toJpeg(el, { pixelRatio, quality: 0.9, fontEmbedCSS, backgroundColor: '#ffffff' })
    if (i) pdf.addPage('a5')
    pdf.addImage(img, 'JPEG', 0, 0, 148, 210)
  }
  return pdf
}
