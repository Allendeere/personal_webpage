import sharp from 'sharp'
import { mkdir, readdir, readFile, writeFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = process.argv[2]
if (!source) throw new Error('Usage: node scripts/prepare-assets.mjs <portfolio-directory>')
const destination = path.join(root, 'public', 'projects')
const editDirectory = path.join(root, 'scripts', 'asset-edits', 'corporate')
const corporateEdits = JSON.parse(await readFile(path.join(editDirectory, 'regions.json'), 'utf8'))
const folders = [
  ['launcher', '啟動器'],
  ['pdf', '桌面軟體/弄那個PDF的'],
  ['nspy', '桌面軟體/生產力工具'],
  ['rental', '網頁製作/家具租債網站'],
  ['corporate', '網頁製作/形象網站製作'],
  ['magnetic', '遊戲製作/多人下棋遊戲'],
  ['rhythm', '遊戲製作/多人節奏遊戲'],
  ['speech', '遊戲製作/語言治療'],
]
const manifest = {}
let originalBytes = 0
let optimizedBytes = 0
for (const [slug, relative] of folders) {
  await mkdir(path.join(destination, slug), { recursive: true })
  const files = (await readdir(path.join(source, relative))).sort()
  manifest[slug] = []
  let index = 0
  for (const file of files) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue
    // The supplied note explicitly retires the old magnetic-game composite.
    if (slug === 'magnetic' && file === 'image_original.png') continue
    if (slug === 'speech' && file === 'speech-therapy-h03 (1).png') continue
    const input = path.join(source, relative, file)
    const edits = slug === 'corporate' ? corporateEdits.filter(item => item.original === file) : []
    const number = String(index++).padStart(2, '0')
    const name = `${number}${edits.length ? '-anonymous' : slug === 'speech' ? '-refined' : ''}.webp`
    const image = sharp(input)
    const metadata = await image.metadata()
    let prepared = image.resize({ width: 1600, withoutEnlargement: true })
    if (edits.length) {
      const sized = await prepared.png().toBuffer()
      prepared = sharp(sized).composite(edits.map(edit => ({ input: path.join(editDirectory, edit.patch), left: edit.left, top: edit.top })))
    }
    if (slug === 'speech') {
      // These reviewed derivatives retain the original UI and data while refining the artwork.
      prepared = sharp(await readFile(path.join(root, 'scripts', 'asset-edits', 'speech', `${number}.webp`)))
    }
    const result = await prepared.webp(edits.length || slug === 'speech' ? { lossless: true, effort: 5 } : { quality: 86, effort: 5 }).toFile(path.join(destination, slug, name))
    const { size } = await import('node:fs/promises').then(fs => fs.stat(input))
    originalBytes += size
    optimizedBytes += result.size
    manifest[slug].push({ file: `projects/${slug}/${name}`, original: file, width: result.width, height: result.height, originalWidth: metadata.width })
  }
  const video = files.find(file => file.endsWith('.mp4'))
  if (video) await copyFile(path.join(source, relative, video), path.join(destination, slug, 'gameplay.mp4'))
}
await writeFile(path.join(root, 'src', 'asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
await copyFile(path.join(root, 'scripts', 'asset-edits', 'PROVENANCE.md'), path.join(destination, 'PROVENANCE.md'))
console.log(`Prepared ${Object.values(manifest).flat().length} images: ${(originalBytes / 1e6).toFixed(1)} MB → ${(optimizedBytes / 1e6).toFixed(1)} MB. Gameplay video copied.`)
