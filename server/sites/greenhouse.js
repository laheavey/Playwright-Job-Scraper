const crawlee = require('crawlee');

const greenhouse = async () => {
  // Playwright launched, new browser opened
  const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage();

  const jobArray = [];
  const urlArray = [
    'https://boards.greenhouse.io/nerdery',
    'https://boards.greenhouse.io/praxent',
    'https://boards.greenhouse.io/pluralpolicy',
  ];

  // Opnes a page for all urls in array
  for (const url of urlArray){
    await page.goto(url);

    // Grabs job data as an object, pushes it into scrapedData array
    const openPositions = await page
    .locator('section.level-0 > div')
    .evaluateAll((data) => {
      const scrapedData = [];
      data.forEach((row) => {
        // Numbers are specific Dept. IDs for Praxent & Nerdery, respectively
        if (row.getAttribute('department_id') == 4004089003 || row.getAttribute('department_id') == 4012791004){
          scrapedData.push({
            title: row.querySelector('a').innerText,
            company: document.title.slice(8),
            location: row.querySelector('span.location').innerText,
            apply: row.querySelector('a').href
          });
        }
      });
      return scrapedData;
    });
    jobArray.push(openPositions);
  };
  const flatJobArray = jobArray.flat();
  return flatJobArray;
}

module.exports = greenhouse;