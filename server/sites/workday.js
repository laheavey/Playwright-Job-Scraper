// *----- NOT WORKING; REVISIT -----*//

const crawlee = require('crawlee');

const workday = async () => {
  // Playwright launched, new browser opened
  const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage();

  const jobArray = [];
  const urlArray = [
    'https://gensler.wd1.myworkdayjobs.com/genslercareers?jobFamilyGroup=12c7f72f34f4107a102dfbba3f995285&jobFamilyGroup=12c7f72f34f4107a102de50604505275&jobFamilyGroup=12c7f72f34f4107a102de7d265d25277'  
  ];

  // Opnes a page for all urls in array
  for (const url of urlArray){
    await page.goto(url);

    // Grabs job data as an object, pushes it into scrapedData array
    const openPositions = await page
    .locator('section.css-8j5iuw > ul > li')
    // .innerHTML()
    .evaluateAll((data) => {
      console.log('Data: ', data.innerHTML)
      const scrapedData = [];
      data.forEach((row) => {
        console.log('Row: ', row)
          scrapedData.push({
            title: row.querySelector('div.css-qiqmbt > div.css-b3pn3b > div > h3 > a').innerText,
            // company: document.title.slice(8),
            // location: row.querySelector('div.css-k008qs > dd').innerText,
            // apply: row.querySelector('a').href
          });
      });
      console.log('scrapedData: ', scrapedData)
      return scrapedData;
    });
    jobArray.push(openPositions);

  };
  const flatJobArray = jobArray.flat();
  console.log('Flat Job Array: ', flatJobArray)
  return flatJobArray;
}

workday()

module.exports = workday;