import { useEffect, useState } from "react";
const playwright = require('playwright')

const frameHandle = async() => {
	const [kipsuArray, setKipsuArray] = useState([]);
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

	await page.waitForTimeout(800)

	const openPositions = await page
		.frameLocator('iframe')
		.locator('tr:nth-child(4)')
		.locator('div.gnewtonCareerGroupRowClass')
		.locator('div.gnewtonCareerGroupJobTitleClass')
		.locator('a')
		.allInnerTexts()

	console.log('openPositions: ', openPositions)
	await browser.close();
	return openPositions;
};
