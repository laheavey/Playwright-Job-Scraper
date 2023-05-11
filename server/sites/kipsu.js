// import { Dataset, PlaywrightCrawler, launchPlaywright } from 'crawlee'
const crawlee = require('crawlee');

const kipsu = async () => {
	const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage();
	
	await page.goto('https://www.kipsu.com/careers');

	await page
		.frameLocator('iframe')
		.locator('#gnewtonDepartment')
		.selectOption('8a7883c685eb8d250186049a6f31088d')

	await page
		.frameLocator('iframe')
		.locator('#gnewtonSearchBtn')
		.click()

	await page.waitForTimeout(800)

	const openPositions = await page
		.frameLocator('iframe')
		.locator('div.gnewtonCareerGroupRowClass')
		.evaluateAll((data) => {
			const scrapedData = [];
			data.forEach((row) => {
				scrapedData.push({
					title: row.querySelector('div .gnewtonCareerGroupJobTitleClass').innerText,
					company: 'Kipsu',
					location: row.querySelector('div.gnewtonCareerGroupJobDescriptionClass').innerText,
					apply: row.querySelector('div.gnewtonCareerGroupJobTitleClass a').href
				});
			});
			return scrapedData;
		});
	// console.log('Open positions: ', openPositions)
	// await crawlee.Dataset.pushData(openPositions);	
	return openPositions;
}

module.exports = kipsu;
		
// console.log('Crawler finished.');
// await Dataset.pushData(openPositions);	
// await Dataset.exportToJSON('Kipsu_Positions');	
// await browser.close();
