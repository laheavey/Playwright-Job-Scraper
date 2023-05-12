const crawlee = require('crawlee');

const lever = async () => {
  // Playwright launched, new browser opened
  const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage();

  const jobArray = [];
  const urlArray = [
    'https://jobs.lever.co/gravie',
    'https://jobs.lever.co/flywheel-2',
    'https://jobs.lever.co/granicus', // Confirm dropdown selected is correct;
  ];

  // Checks all urls in array
  for (const url of urlArray){
    await page.goto(url);

    // Once page is open, filters are found/selected
    await page
    .locator('div.filter-bar')
    .getByLabel('Filter by Team: All')
    .click();

    // Search button clicked, filtering data
    await page
    .getByRole('button', { expanded: true })
    .locator('li')
    .filter({ hasText: 'Engineering' })
    .filter({ hasNotText: 'Platform' }) // Excluding Cloud Platforms dept at Granicus
    .click();

    await page.waitForTimeout(800);

    // Grabs job data as an object, pushes it into scrapedData array
    const openPositions = await page
    .locator('div.posting')
    .evaluateAll((data) => {
      const scrapedData = [];
      data.forEach((row) => {
        scrapedData.push({
          title: row.querySelector('h5').innerText,
          company: document.title,
          location: row.querySelector('a.posting-title > div.posting-categories > span.location').innerText,
          apply: row.querySelector('a.posting-title').href
        });
      });
      return scrapedData;
    });
    jobArray.push(openPositions);
  };
  const flatJobArray = jobArray.flat();
  return flatJobArray;
}

module.exports = lever;