This the Wowcher React App repo

## Getting Started

### NVM

Install [NVM](https://github.com/nvm-sh/nvm#install--update-script) if you have not installed it already.

Alternatively, if you're using MacOS and have Homebrew installed, run:

```bash
brew install nvm
```

Don't forget to install the additional script to add in `~/.bashrc` / `./zshrc`. Then close and reopen your terminal to apply the changes.

In the console, `cd` to the repo root and run `nvm use`. This will install the correct Node and NPM version automatically, as specified in `.nvmrc`.

To test that the correct Node version is running, run `node --version` or `nvm current`.

##

Run `npm install` as usual.

Rename `.env.local.example` file to `.env.local`

Run development server by running `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Storybook

To run storybook use

```bash
npm run storybook
```

when making changes to storybook stories you will need to rebuild the storybook system if not done automatically
in this case use

```bash
npm run build-storybook
```

this will force storybook to rebuild the whole library and stories with your changes.

If you are adding addons for storybook, you will need to add the addon in `.storybook/main.js`

If you would like to autoload your addons without implicitly importing those dependancies manually, you can add them inside `.storybook/preview.js`

import them as normal and set `addDecorator(*insert import name*);`

## Running Unit tests

To run unit tests use

```bash
npm run test
```

Although we will use the folder `__test__` to store all our tests, this command will search for all the files in the project with the preffix .test.

All the test configuration is done in the files
`jest.config.js`
`jest.setup.js`

The file `fileMock` will be use to mock all the documents that not need to be tested (like CSS or image files).

## Installing Cypress

Our smoke tests and integration tests will be using cypress.

Current version of cypress we are using is `6.8.0`

`You can install this globally on your system`

```bash
sudo npm install -g cypress@6.8.0
```

`You can install this locally on your system`

```bash
npm install cypress@6.8.0
```

## Smoke Tests

Our intentions is to write e2e tests to test our core pages.

There are two ways you can run this through the cli or through the headless browser.

Highly recommend if developing please use the cli to give you more insight and tools to help right the tests.

When developing please read the readme.md to in the cypress folder.

Any failed tests will attempt to rerun again to stop flakiness of tests or how they are written.

### Run desktop tests through the cli locally

`Make sure you have your application running locally`

```bash
npm run cypress:smoke
```

### Run tests base on url e.g dev05

`You can run this against an environment`

```bash
BASEURL={url} npm run cypress:smoke
```

### Run mobile smoke tests

`To run tests with mobile view port`

```bash
npm run cypress:smoke:mobile
```

### Run tablet smoke tests

`To run tests with mobile view port`

```bash
npm run cypress:smoke:tablet
```

### Run Smoke tests through headless

`You can run the tests through the headless browser. The default command will run against your local environment`

```bash
npm run cypress:smoke:run
```

## Integration Tests

`You can run integration tests, which is the default behaviour. Please make sure your have your application running`

```bash
npm run cypress
```
