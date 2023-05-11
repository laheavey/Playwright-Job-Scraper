import { launchPlaywright } from 'crawlee'

const Gravie = async () => {
	const browser = await launchPlaywright();
	const page = await browser.newPage();
	
	await page.goto('https://jobs.lever.co/gravie');

  await page
    .locator('div.filter-bar')
    .getByLabel('Filter by Team: All')
    .click()

  await page
    .getByRole('button', { expanded: true })
    .locator('li')
    .filter({ hasText: 'Engineering' })
    .click()
  
  await page.waitForTimeout(800)

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

module.exports = Gravie;

// console.log('Crawler finished.');
// await Dataset.pushData(openPositions);
// await Dataset.exportToJSON('Gravie_Positions');	
// await browser.close();