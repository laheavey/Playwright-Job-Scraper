const puppeteer = require('puppeteer');

// async function getVisual() {
// 	try {
// 		const browser = await puppeteer.launch({
// 			headless: false
// 		})
// 		const page = await browser.newPage()

// 		await page.goto('https://www.kipsu.com/careers')
// 		const frameHandle = await page.$('#gnewtonIframe');
//     const frame = await frameHandle.contentFrame();
// 		await frame.waitForSelector('#gnewtonCareerHome')

// 		const LIST_POSITION_SELECTOR = '#gnewtonCareerHome > tbody > tr:nth-child(4) > td > div:nth-child(INDEX) > div.gnewtonCareerGroupJobTitleClass > a'
// 		const LENGTH_SELECTOR_CLASS = 'gnewtonCareerGroupRowClass'

// 		let listLength = await frame.evaluate((sel) => {
// 			return document.getElementsByClassName(sel).length;
// 		}, LENGTH_SELECTOR_CLASS);

// 		for (let i = 1; i <= listLength; i++) {
// 			// change the index to the next child
// 			let positionSelector = LIST_POSITION_SELECTOR.replace("INDEX", i);
	
// 			let position = await frame.evaluate((sel) => {
// 					return document.querySelector(sel).getAttribute('href').replace('/', '');
// 				}, positionSelector);
	
// 			console.log('Position: ', position);
// 	}

// 		// await page.screenshot({ path: 'screenshot.png' })
// 		// await page.pdf({ path: 'page.pdf' })


// 	browser.close()
// 	} catch (error) {
// 		console.error(error)
// 	}
// }

// getVisual()

async function frameHandle() {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	
	await page.goto('https://www.kipsu.com/careers');

	const frame = await page.$('#gnewtonIframe') // Finding iFrame
	const frameContents = await frame.contentFrame(); // Getting contents of iFrame

	const jobTable = await frameContents.$('table#gnewtonCareerHome > tbody > tr:nth-child(4) > td');
	const openPositions = await jobTable.evaluate((el) => el.innerText);
	console.log('Kipsu - Open Positions: ',openPositions);

	// await browser.close();
	
	};
	
frameHandle();