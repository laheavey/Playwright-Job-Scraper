const puppeteer = require('puppeteer');

async function pageHandle() {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	
	await page.goto('https://jobs.lever.co/gravie');

  const [filterElement] = await page.$x("//div[@class='filter-bar']/div[contains(., 'Team')]")
  
  if (filterElement) {
    await filterElement.click();
    const [teamFilter] = await page.$x("//li[contains(., 'Engineering')]")
    
    if (teamFilter) {
      await teamFilter.click();
      const engPostings = await page.waitForSelector('div.postings-group')
      const openPositions = await engPostings.evaluate((el) => el.innerText);
      console.log('******* GRAVIE - Open Positions: *******',openPositions);
    }
  }

	await browser.close();
	
	};
	
pageHandle ();