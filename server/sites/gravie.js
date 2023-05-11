import { Dataset, PlaywrightCrawler, launchPlaywright } from 'crawlee'
// const playwright = require('playwright')


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
    // .locator('a.posting-title')
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

    console.log('Crawler finished.');
    await Dataset.pushData(openPositions);	
    await browser.close();


// *** PUPPETEER CODE:
// async function pageHandle() {
// 	const browser = await puppeteer.launch({headless: false});
// 	const page = await browser.newPage();
	
// 	await page.goto('https://jobs.lever.co/gravie');

//   const [filterElement] = await page.$x("//div[@class='filter-bar']/div[contains(., 'Team')]")
  
//   if (filterElement) {
//     await filterElement.click();
//     const [teamFilter] = await page.$x("//li[contains(., 'Engineering')]")
    
//     if (teamFilter) {
//       await teamFilter.click();
//       const engPostings = await page.waitForSelector('div.postings-group')
//       const openPositions = await engPostings.evaluate((el) => el.innerText);
//       console.log('******* GRAVIE - Open Positions: *******',openPositions);
//     }
//   }

// 	await browser.close();
	
// };




// async function pageHandle() {
// 	const browser = await playwright.chromium.launch({headless: false});
// 	const page = await browser.newPage();
	
// 	await page.goto('https://jobs.lever.co/gravie');

//   await page
//     .locator('div.filter-bar')
//     .getByLabel('Filter by Team: All')
//     .click()

//   await page
//     .getByRole('button', { expanded: true })
//     .locator('li')
//     .filter({ hasText: 'Engineering' })
//     .click()
  
//   await page.waitForTimeout(800)

//   const roles = await page
//     .locator('div.posting')
//     .locator('a.posting-title')
//     .locator('h5')
//     .allInnerTexts();

//   console.log('Roles: ', roles)
//   await browser.close();
// };
	
// pageHandle ();