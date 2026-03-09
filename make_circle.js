const sharp = require('sharp');
const fs = require('fs');

async function process() {
    const p = 'public/logo.png';
    const img = sharp(p);
    const metadata = await img.metadata();
    const size = Math.min(metadata.width, metadata.height);

    const circleSvg = Buffer.from(
        `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
    );

    await img
        .resize(size, size)
        .composite([{ input: circleSvg, blend: 'dest-in' }])
        .png()
        .toFile('public/logo_temp.png');

    if (fs.existsSync('app/favicon.ico')) fs.rmSync('app/favicon.ico', { force: true });
    fs.copyFileSync('public/logo_temp.png', p);
    fs.copyFileSync(p, 'public/images/logo.png');
    fs.copyFileSync(p, 'app/icon.png');
    fs.rmSync('public/logo_temp.png');
    console.log("Transformation en cercle propre terminée.");
}

process().catch(console.error);
