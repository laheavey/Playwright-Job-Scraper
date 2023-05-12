const crawlee = require('crawlee');

const applytojob = async () => {
  // Playwright launched, new browser opened
  const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage();

  const jobArray = [];
  const urlArray = [
    'https://kyros.applytojob.com/apply',
  ];

  // Opnes a page for all urls in array
  for (const url of urlArray){
    await page.goto(url);

    // Grabs job data as an object, pushes it into scrapedData array
    const openPositions = await page
    .locator('div.jobs-list > ul > li')
    .filter({ hasText: 'Engineer'}) // grabs listing w/ title containing Engineer
    .evaluateAll((data) => {
      const scrapedData = [];
      data.forEach((row) => {
          scrapedData.push({
            title: row.querySelector('a').innerText,
            company: document.title.split(' - ', 1).toString(),
            location: row.querySelector('ul.list-inline > li').innerText,
            apply: row.querySelector('a').href
          });
      });
      return scrapedData;
    });
    jobArray.push(openPositions);
  };
  const flatJobArray = jobArray.flat();
  return flatJobArray;
}

module.exports = applytojob;