import sharp from 'sharp'
import { mkdir, readdir, writeFile, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = process.argv[2]
if (!source) throw new Error('Usage: node scripts/prepare-assets.mjs <portfolio-directory>')
const destination = path.join(root, 'public', 'projects')
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
    const name = `${String(index++).padStart(2, '0')}.webp`
    const image = sharp(input)
    const metadata = await image.metadata()
    const result = await image.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 86, effort: 5 }).toFile(path.join(destination, slug, name))
    const { size } = await import('node:fs/promises').then(fs => fs.stat(input))
    originalBytes += size
    optimizedBytes += result.size
    manifest[slug].push({ file: `projects/${slug}/${name}`, original: file, width: result.width, height: result.height, originalWidth: metadata.width })
  }
  const video = files.find(file => file.endsWith('.mp4'))
  if (video) await copyFile(path.join(source, relative, video), path.join(destination, slug, 'gameplay.mp4'))
}
await writeFile(path.join(root, 'src', 'asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
await writeFile(path.join(destination, 'PROVENANCE.md'), '# Asset provenance\n\nAll project images and the gameplay video were supplied by Sarah from her portfolio directory. Images are resized and encoded as WebP without changing their content. Original filenames and dimensions are recorded in src/asset-manifest.json. The retired magnetic-game composite and duplicate speech-therapy image are excluded.\n')
console.log(`Prepared ${Object.values(manifest).flat().length} images: ${(originalBytes / 1e6).toFixed(1)} MB → ${(optimizedBytes / 1e6).toFixed(1)} MB. Gameplay video copied.`)
