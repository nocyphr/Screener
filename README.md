- [Update:](#update)
- [About](#about)
- [Features](#features)
- [Installation for development](#installation-for-development)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [Work in Progress](#work-in-progress)
  - [Preparation](#preparation)
  - [Genesis](#genesis)
  - [Refactoring](#refactoring)
  - [Issues](#issues)

## Update:
The further along you get in a Project the more you realize where you f.cked up before. 
The current code was my first try to build a react project completely from scratch. Although I have worked with it before(legacy code), building the structure from scratch in a good way while maintaining a structure that can be easily maintained is harder than refactoring and fixing code/structure that already exists :)
The next step is a major refactoring, but I want to produce a useable product first - for this I need my backend, which will be python/fastAPI/mysql (thank god, js is a pain - who thought it was a good idea to slap it into a backend as well with node?) 
The focus during the next few days/weeks will therefore primarily be on my backend. once that is working and data is scraped, prepared and served through the api into my frontend, I will continue the refactoring/restructuring steps needed for a clean react frontend

## About
A simple stock screener for `magic formula` and `aquirer's multiple` stocks. 

This Frontend is built using React - I am more of a python than a React-Programmer, so if someone, who uses this framework frequently and professionally, wants to improve on some things, feel free to [contribute](#contributing)

There is (or will be once I am done) a backend as well, which consists of a scraper, db and an api. I will create separate repositories for those though and the scraper might stay private to avoid a horde of people spamming the servers and getting the interfaces shut down. 

![App_Img.png](Screenshots/App_Img.png)

## Features

You can: 
- view
- filter
- sort
- download
a list of stocks according to your preferences

## Installation for development

To install the project, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/nocyphr/Screener.git
```
2. navigate to the directory
3. if you have installed docker and docker compose you can run
```bash
bash start_dev.sh
```
The rest happens on its own :D Magic of docker. If you do not know how to install docker please google `install docker <your_OS>` there will be a result at the top linking to the official docker documentation which gives you very detailed instructions on how to install docker and docker compose for your specific operating system. If you are on windows you will have to run the contents of the `start_dev.sh` file yourself in your terminal. 

## Running Tests
Open a terminal in the project folder and execute the following command: 
```bash
docker-compose -f ./misc/docker-compose.selenium up
``` 
Once selenium is running, open a new terminal and execute: 
```bash
bash run_tests.sh
```

This executes the gherkin step definitions and unit-tests

## Contributing

1. Fork the project repository
2. Create a new branch for your feature or bugfix: `git checkout -b my-feature-branch`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push your branch: `git push origin my-feature-branch`
5. Submit a pull request

## Work in Progress
### Preparation
- [x] write top level feature
- [x] write step definitions
- [x] setup basic docker(compose) structure
- [x] setup cucumber-js
- [x] setup selenium + webdriver
- [x] write a README

### Genesis
- [x] extend feature file for existence checks of elements?
- [x] Fill in the blank step definitions with actual tests
  - [x] title (h1) should be Nocyphr Stock Screener
  - [x] there is a table section
  - [x] there is data in the table
  - [x] there is a filter section
  - [x] sorting is possible and works
  - [x] filtering is possible and works
  - [x] getting the current table in csv format is possible (link? Download?)
- [x] styling? Frameworks? (bootstrap vs. tailwind)
- [x] refine Scenario: Filter stock data Outline with examples column | filter -> test text column, numerical column, operators
- [x] "remember" (cookie) applied sorting after page reload
- [x] "remember" (cookie) applied filters after page reload 
- [x] Add test for sequential filters
- [ ] Repackage dockers for tests/deploy versions(deploy should use npm build + traefik + nginx to serve)
- [ ] Add tests for ability to 
  - [ ] remove all filters at once
  - [ ] remove 1/n filters
  - [ ] remember sorting
  - [ ] remember filters
  - [ ] pages counter in pagination should be >1 if elements > 10
  - [ ] current page should adjust if filters reduce total number of pages below current page position

### Refactoring
- [x] use hooks directory and move code there to simplify components code
- [x] eliminate single helpers file (FilterLogic.js)
- [x] move logic from App.jsx to useFilter.js
- [ ] clean up code (comments unused bits and bops)
- [ ] restructure
  - [ ] use a test.env for tests, .env for deployment
  - [ ] extract pagination to app.jsx
  - [ ] remove logic from any Component
  - [ ] remove non hook logic from hooks
  - [ ] relocate non hook logic to utils.js/ a utils folder
  - [ ] refactor utils function for testability
  - [ ] write unit tests for all utils functions
  - [ ] App.jsx should only contain components, not logic
- [ ] Create README 2.0

### Issues
- [x] Download button moves as filters are added instead of staying on the level of applyfilters button
- [x] Go to page 2, set symbol filter to "A" -> you are on an empty page 2 because there are only enough items for one page
- [x] Sorting is lost in downloaded csv, only filters stay applied


find . -type f -exec sh -c 'echo -e "\n{}:" >> ../output.file; cat {} >> ../output.file' \;
