const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321');
  const text = await page.locator('text=Firefox 147').count();
  console.log('Count:', text);
  await browser.close();
})();
