const crawlee = require('crawlee');

const gravie = async () => {
  // Playwright launched, new page opened, navigates to job board
	const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage();
	await page.goto('https://jobs.lever.co/gravie');

  // Once page is open, filters are found/selected
  await page
    .locator('div.filter-bar')
    .getByLabel('Filter by Team: All')
    .click()

  // Search button clicked, filtering data
  await page
    .getByRole('button', { expanded: true })
    .locator('li')
    .filter({ hasText: 'Engineering' })
    .click()
  
  await page.waitForTimeout(800)

  // Grabs job data as an object, pushes it into scrapedData array
  const openPositions = await page
    .locator('div.posting')
    .evaluateAll((data) => {
      const scrapedData = [];
      data.forEach((row) => {
        scrapedData.push({
          title: row.querySelector('h5').innerText,
          company: 'Gravie',
          location: row.querySelector('a.posting-title > div.posting-categories > span.location').innerText,
          apply: row.querySelector('a.posting-title').href
        });
      });
      return scrapedData;
    });
  return openPositions;
}

module.exports = gravie;