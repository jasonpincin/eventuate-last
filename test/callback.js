var test           = require('tape'),
    eventuate      = require('eventuate-core'),
    last           = require('..'),
    CancelledError = require('../errors').CancelledError

test('last accepts a callback', function (t) {
  t.plan(3)

  var event = eventuate()

  last(event, function consume (_, data) {
    t.equals(data, 'test', 'callback consumer receives data')
  })
  t.equals(event.getConsumers().length, 1,
           '.consumers should contain last consumer')
  event.produce('test')
  event.destroy()
  t.equals(event.getConsumers().length, 0,
           'last consumer removed from consumers after callback called')
})

test('callback receives error if eventuate consumer removed', function (t) {
  t.plan(1)

  var event = eventuate()

  last(event, function consume (err, data) {
    t.ok(err instanceof CancelledError, 'err is a CancelledError')
  })
  event.removeAllConsumers()
})

test('callback receives error if eventuate is already destroyed', function (t) {
  t.plan(1)

  var event = eventuate()
  event.destroy()

  last(event, function consume (err, data) {
    t.ok(err instanceof CancelledError, 'err is a CancelledError')
  })
})
