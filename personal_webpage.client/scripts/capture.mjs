import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.impeccable/review')
await mkdir(directory, { recursive: true })
const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'msedge' } : {})
const url = process.argv[2] || 'http://127.0.0.1:5173/'
const report = {}
await Promise.all([{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 390, height: 844 }].map(async viewport => {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(url)
  await page.evaluate(() => document.fonts.ready)
  for (let y = 0; y < await page.locator('body').evaluate(element => element.scrollHeight); y += 650) {
    await page.evaluate(position => scrollTo(0, position), y)
    await page.waitForTimeout(120)
  }
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, 0) })
  await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(directory, `${viewport.name}.png`), fullPage: true })
  await page.screenshot({ path: path.join(directory, `${viewport.name}-hero.png`) })
  report[viewport.name] = await page.evaluate(() => ({
    width: innerWidth, documentWidth: document.documentElement.scrollWidth,
    images: [...document.images].map(image => ({ src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0 })),
    bodyFont: getComputedStyle(document.body).fontFamily, h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
    bodySize: getComputedStyle(document.body).fontSize,
    descriptionSize: getComputedStyle(document.querySelector('.about-description')).fontSize,
    minimumTextSize: Math.min(...[...document.querySelectorAll('body *')].filter(element => element.getClientRects().length && [...element.childNodes].some(node => node.nodeType === 3 && node.textContent.trim())).map(element => parseFloat(getComputedStyle(element).fontSize))),
    background: getComputedStyle(document.body).backgroundColor,
  }))
  report[viewport.name].errors = errors
  await page.locator('a.project-link').first().click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(directory, `${viewport.name}-detail.png`) })
  await page.getByRole('dialog').evaluate(element => { element.scrollTop = element.scrollHeight })
  await page.screenshot({ path: path.join(directory, `${viewport.name}-detail-scrolled.png`) })
  await page.getByRole('button', { name: '關閉專案詳情' }).click()
  if (viewport.name === 'desktop') {
    await page.screenshot({ path: path.join(directory, 'desktop-light.png') })
    await page.getByRole('button', { name: '切換為深色模式' }).click()
    await page.evaluate(() => scrollTo(0, 0))
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(directory, 'desktop-dark.png') })
    await page.getByRole('button', { name: '切換為淺色模式' }).click()
    await page.evaluate(() => scrollTo(0, 0))
    await page.waitForTimeout(400)
    await page.screenshot({ path: path.join(directory, 'desktop-light.png') })
  }
  await page.close()
}))
await writeFile(path.join(directory, 'browser-report.json'), JSON.stringify(report, null, 2))
await browser.close()
console.log(`Screenshots and browser report saved to ${directory}`)
