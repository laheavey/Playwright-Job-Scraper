const axios = require('axios');
const cheerio = require('cheerio');

async function getForum() {
  try {
    const { data } = await axios.get('https://www.kipsu.com/careers');
    const $ = cheerio.load(data);
    console.log('Data: ', data)
    const jobTitles = [];

    $('td > div.gnewtonCareerGroupRowClass').each((_idx, el) => {
      const jobTitle = $(el).text()
      console.log('Job Title: ', jobTitle)
      jobTitles.push(jobTitle)
    });

    return jobTitles;
    
  }
  catch (error) {
    console.log('Error: ', error)
  };
};

getForum()
  .then((jobTitles) => console.log(jobTitles));
