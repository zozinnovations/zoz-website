import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../public/company-profile.pdf');

console.log('Generating PDF...');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 1123, height: 794 });

await page.goto('http://localhost:5173/company-profile.html', {
    waitUntil: 'networkidle0',
    timeout: 30000
});

// Wait for fonts and animations to settle
await new Promise(r => setTimeout(r, 1500));

await page.pdf({
    path: outputPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
});

await browser.close();
console.log('PDF saved to public/company-profile.pdf');
