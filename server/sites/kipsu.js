const crawlee = require('crawlee');

const kipsu = async () => {
	// Playwright launched, new page opened, navigates to job board
	const browser = await crawlee.launchPlaywright();
	const page = await browser.newPage(); 
	await page.goto('https://www.kipsu.com/careers');

	// Once page is open, iframe & filters are found/selected
	await page
		.frameLocator('iframe')
		.locator('#gnewtonDepartment')
		.selectOption('8a7883c685eb8d250186049a6f31088d')

	// Search button clicked, filtering data
	await page
		.frameLocator('iframe')
		.locator('#gnewtonSearchBtn')
		.click()

	// TODO: Test switching from hard wait to smart wait;
	// page.waitForResponse? page.waitForEvent?
	await page.waitForTimeout(800)

	// Grabs job data as an object, pushes it into scrapedData array
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
	return openPositions;
}

module.exports = kipsu;
