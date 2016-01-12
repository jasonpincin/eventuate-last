var test           = require('tape'),
    eventuate      = require('eventuate-core'),
    last           = require('..'),
    CancelledError = require('../errors').CancelledError

test('last returns a promise that resolves', function (t) {
  t.plan(3)

  var event = eventuate()

  last(event).then(function (data) {
    t.equals(data, 'abc', 'promise resolves with data')
  })
  t.equals(event.consumers().length, 1, '.consumers contains last consumer')
  event.produce('test')
  event.produce('abc')
  event.destroy()
  t.equals(event.consumers().length, 0,
           'last consumer removed from consumers promise resolves')
})

test('last returns a promise that rejects if consumer removed', function (t) {
  t.plan(1)

  var event = eventuate()

  last(event).then(function () {}, function (err) {
    t.ok(err instanceof CancelledError, 'err is a CancelledError')
  })
  event.removeAllConsumers()
})

test('last promise rejects if eventuate is already destroyed', function (t) {
  t.plan(1)

  var event = eventuate()
  event.destroy()

  last(event).then(function () {}, function (err) {
    t.ok(err instanceof CancelledError, 'err is a CancelledError')
  })
})
