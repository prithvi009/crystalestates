import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const logos = [
  { svg: 'crystal-estates-logo-1080x1080.svg', png: 'crystal-estates-logo-1080x1080.png', w: 1080, h: 1080 },
  { svg: 'crystal-estates-profile-800x800.svg', png: 'crystal-estates-profile-800x800.png', w: 800, h: 800 },
  { svg: 'crystal-estates-landscape-1080x540.svg', png: 'crystal-estates-landscape-1080x540.png', w: 1080, h: 540 },
];

for (const logo of logos) {
  const svgPath = join(__dirname, 'public', logo.svg);
  const outPath = join(__dirname, 'public', logo.png);
  const svgBuffer = readFileSync(svgPath);

  await sharp(svgBuffer, { density: 150 })
    .resize(logo.w, logo.h)
    .png({ quality: 100 })
    .toFile(outPath);

  console.log(`✅ Created ${logo.png} (${logo.w}x${logo.h})`);
}

console.log('\nAll logos saved to public/ folder');
