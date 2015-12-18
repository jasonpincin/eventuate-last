# eventuate-last

[![NPM version](https://badge.fury.io/js/eventuate-last.png)](http://badge.fury.io/js/eventuate-last)
[![Build Status](https://travis-ci.org/jasonpincin/eventuate-last.svg?branch=master)](https://travis-ci.org/jasonpincin/eventuate-last)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/eventuate-last/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/eventuate-last?branch=master)

Act upon the last produced value of an eventuate

## example

```javascript
var eventuate = require('eventuate-core'),
    last      = require('eventuate-last')

var command = eventuate()

last(command, function (err, lastCommand) {
  if (err) console.error(err)
  console.log('The last command was: ' + lastCommand)
})

command.produce('ls')
command.produce('mkdir')
command.produce('exit')
command.destroy()

// output will be:
// The last command was: exit
```

## api

```javascript
var last = require('eventuate-last')
```

### last(eventuate [, cb])

`last` requires a (non-basic) `eventuate` as it's 1st argument, and optionally
accepts an error-first callback, `cb`, as a 2nd argument. The `last` function 
returns a `Promise`. When the given `eventuate` produces it's last value 
(defined) as the value preceeding the eventuate being destroyed via `destroy()`,
the `Promise` will resolve with the value. If a callback was provided, it will 
be executed with a falsy error and the value. 

If, while `last` is waiting on the eventuate to be destroyed, the consumer that 
`last` attaches to the `eventuate` is removed, then the `Promise` will be 
rejected with a `CancelledError` (see below). If a callback was provided, it 
will be executed with the `CancelledError`. 

## errors

```javascript
var errors = require('eventuate-last/errors')
```

### errors.CancelledError

Constructor of error supplied to callback or Promise rejection in the event the
`last` consumer is removed prior to the eventuate being destroyed.

## install

With [npm](https://npmjs.org) do:

```
npm install --save eventuate-last
```

## testing

`npm test`

Or to run tests in phantom: `npm run phantom`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
