# jbplaywright


Install dependencies

`npm install`

make sure playwright is installed globally 

then run 

`npx playwright test`

or for specific test

`npx playwright test --grep="JIRA-XXX"`

or run 

`npm run test` that will run behind the scenes `npx playwright test --reporter=list --max-failures 10"`