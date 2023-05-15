# Unnamed JS Job Posting Webscraper

*Tentative Name: Prime Crib*

This app scrapes the career webpages of companies I've identified as having previously hired graduates of Prime Digital Academy. It returns open software engineering or swe-adjacent roles currently listed on each site.


### Table of Contents
- [Approach](#approach)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
<!-- - [Usage](#usage)
- [Screenshots](#screenshots)
- [Notes](#notes)
  - Thoughts
  - Challenges
  - Future State -->

## Approach

After graduating from Prime, I theorized that it would likely be easier to land my first SWE job at one of the many companies that had hired at least one prior graduate of my program. In my mind, these companies would already be familiar with the quality of education Prime provides, and I'd have an immediate and natural connection point to someone on the team. 

I scoured LinkedIn profiles and came up with a fairly robust list of companies; however, it was pretty tedious to manage the various LinkedIn alerts for job postings (and I couldn't be sure every company was even *using* LinkedIn for open roles). After a few days of refreshing a metric ton of individual business websites, I figured there was an opportunity here to make my life a little easier. 

My intent is to tackle this in three stages: 


### Stage 1: Initial Exploration
- [x] Investigate how webscrapers work, frameworks and libraries I may want to integrate
  - [x] Confirm this is ethical/legal?? Avoid prison and/or lawsuits
  - [x] Spend time Googling and searching Reddit.com for recent opinions, common issues, and popular tech choices
- [x] Clean up site list, identify template HR pages (e.g. lever.co, greenhouse, etc.) for potential repeatability
- [x] Test out a few different options
  - [x] Try Next.js
    - I'd done some experimenting here previously and considered using it for this project
    - Felt I was getting a little lost in the weeds, decided it wasn't the greatest idea to try a brand new framework/library on something I wasn't yet super confident about
  - [x] Try Puppeteer
    - This was fine! Very similar to Playwright
  - [x] Try Playwright (landed on this one) 
    - Worked in more browsers, had great documentation, and gave me the option to rewrite this whole thing in another language if I want the practice later on

### Stage 2: Initial Build
- [x] Begin scraping meaningful data
  - [x] Get all jobs on a page first, just to see if I can
  - [x] Filter jobs to just tech/SWE/SWE-adjacent
  - [x] Format scraped data object
  - [x] Figure out how to run through multiple URLs for template HR pages
- [ ] Get the data to the DOM
  - [x] Run all of the scraping at once
  - [x] Conditionally render DOM depending on data/no data
  - [ ] Make sure it's accessible
    - [x] Use semantic HTML
    - [x] Add labels/scope/name
    - [ ] Confirm navigable by tabs
- [ ] Finish scripts for all career pages
  - [ ] Full list of companies/websites in server > sites > sitelist.md
- [ ] Figure out tests: best practices, expected behavior, etc.
- [ ] Basic styling

### Stage 3: Improvements
- [ ] Styling for readability, morale-boosting, endorphins, etc.
  - [ ] Make responsive
  - [ ] Keep accessible
- [ ] Speed (currently *not fast*)
  - [ ] Test speed difference of filtering on a site (pre-scrape) vs. grabbing all roles and then filtering (post-scrape)
  - [ ] Test storing jobs that were previously pulled, adding logic to only pull new postings
- [ ] Explore cookies & login memory for certain sites (e.g. Workday) when clicking 'Apply' button
- [ ] Add additional sites (aka hedge my bets)

## Getting Started

### Prerequisites
- [React.js](https://beta.reactjs.org/) (built on version 18.2.0)
- [Node.js](https://nodejs.org/en/docs/)
- [Axios](https://axios-http.com/docs/intro)
- [Express](https://expressjs.com/en/4x/api.html)
- [Node-postgres](https://node-postgres.com/) (pg)
- [Playwright](https://playwright.dev/)
- [Crawlee](https://crawlee.dev/)


### Installation

Using your package manager, install the dependencies.
```
$ ~ npm install
```

Start the server.
```
$ ~ npm run server
```

With the server running, open another terminal window and start your client. Navigate to http://localhost:3000 if the run client script doesn't automatically open the application.
```
$ ~ npm run client
```

<!-- ## Usage


## Screenshots


## Notes -->

