const puppeteer = require('puppeteer');
const playwright = require('playwright')

// *** PUPPETEER CODE:
// async function frameHandle() {
// 	const browser = await puppeteer.launch({headless: false});
// 	const page = await browser.newPage();
	
// 	await page.goto('https://www.kipsu.com/careers');

// 	const frame = await page.$('#gnewtonIframe') // Finding iFrame
// 	const frameContents = await frame.contentFrame(); // Getting contents of iFrame

// 	const jobTable = await frameContents.$('table#gnewtonCareerHome > tbody > tr:nth-child(4) > td');
// 	const openPositions = await jobTable.evaluate((el) => el.innerText);
// 	console.log('******* KIPSU - Open Positions: *******',openPositions);

// 	await browser.close();
	
// };

async function frameHandle() {
	const browser = await playwright.chromium.launch({headless: false});
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

	const openPositions = await page
		.frameLocator('iframe')
		.locator('tr:nth-child(4)')
		// .locator('div:has(div)')
		.innerText()

	console.log('openPositions: ', openPositions)
	await browser.close();
};
	
frameHandle();
