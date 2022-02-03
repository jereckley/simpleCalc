# Calc App

## Description
This is a command line calculator app that is expecting the user to enter reverse polish notation to get results. It is a typescript solution that uses the "readline-sync" package to allow the user to enter needed input.

## Technical Reasoning
My reasoning was to use existing tools as much as I could hence bringing in the "readline-sync" package. Since the calculator was pretty simple it made sense to me to keep track of the state in the app with a simple object (calc.ts). It was also pretty easy to test. It also seemed practical in this situation to throw and catch errors to deal with bad user input. 

Jest and Sinon are great testing tools. Sinon helps developers make sense of mocking and helps keeps tests readable. As noted in a comment, since this is pure typescript I needed to create an object of some of the root level tools so I could test them.

## Tradeoffs
In hind site I think it would have been fun to use a state machine like x-state to power the application. I would spend more time making sure it's clear to the user how to use the app. I left a comment on a method that I feel like needed to be refactored. It's just a bit too big. I didn't see any easy meaningful abstractions so it probably would have taken a bit. Often when I'm trying to refactor I wish I had written it in GoLang because GO allows multiple return values out of the box.  

### How to run:
* npm install
* npm run start

### How to test:
* npm run test


