import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const input = path.join(process.cwd(), 'public', 'logo.svg');
const publicDir = path.join(process.cwd(), 'public');

async function generateIcons() {
    console.log(`Processing ${input}...`);

    if (!fs.existsSync(input)) {
        console.error('Error: public/logo.svg not found!');
        process.exit(1);
    }

    // Favicon (32x32)
    await sharp(input)
        .resize(32, 32)
        .png()
        .toFile(path.join(publicDir, 'favicon.png'));
    console.log('Generated public/favicon.png (32x32)');

    // Apple Touch Icon (180x180)
    await sharp(input)
        .resize(180, 180)
        .png()
        .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('Generated public/apple-touch-icon.png (180x180)');

    // Larger Icon for reuse if needed (512x512)
    await sharp(input)
        .resize(512, 512)
        .png()
        .toFile(path.join(publicDir, 'icon-512.png'));
    console.log('Generated public/icon-512.png (512x512)');
}

generateIcons().catch(err => {
    console.error(err);
    process.exit(1);
});
