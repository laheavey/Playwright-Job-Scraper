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

let scrape = async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	
	await page.goto('https://www.kipsu.com/careers');
	const frame = await page.$('#gnewtonIframe')
	// await frame.click('body > form > font > select');
	// await page.waitFor(1000);

	console.log('Frame: ', frame)
	
	
	const optionsResult = 
			await frame.$eval('#gnewtonCareerHome > tbody > tr:nth-child(4) > td > div.gnewtonCareerGroupRowClass', (options) => {
			const result = options.map(option => option.innerText);
	
			return result;
	});
	
	await browser.close();
	
	return optionsResult;
	};
	
	scrape().then((value) => {
		console.log(value); // Success!
	});