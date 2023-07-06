const crawlee = require('crawlee');

const linkedIn = async () => {
  // Playwright launched, new browser opened
  const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage();

  const jobArray = [];
  const urlArray = ['']; // Removed temporarily

  // Opnes a page for all urls in array
  for (const url of urlArray){
    await page.goto(url);

    // page.locator is where things appear to go sideways? Earlier console.logs show up, but nothing in evaluateAll.
    const openPositions = await page
    .locator('//*[@id="ember1112"]')
    .evaluateAll((data) => {
      const scrapedData = [];
      data.forEach((row) => {
          scrapedData.push({
            title: row.querySelector('//*[@id="ember1118"]').innerText,
            company: row.querySelector('//*[@id="ember1119"]/span').innerText,
            location: row.querySelector('//*[@id="ember1120"]/ul/li').innerText,
            apply: row.querySelector('//*[@id="ember1118"]').href
          });
      });
      return scrapedData;
    });
    jobArray.push(openPositions);
    // console.log('Open Positions: ', openPositions)
  };
  const flatJobArray = jobArray.flat();
  // console.log('Job Array Flat:', jobArray.flat())
  return flatJobArray;
}

module.exports = linkedIn;