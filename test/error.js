var test               = require('tape'),
    eventuate          = require('eventuate-core'),
    last               = require('..')

test('last rejects on error', function (t) {
  t.plan(1)

  var event = eventuate()

  last(event, function consume (err, data) {
    t.ok(err instanceof Error, 'received error')
  })
  event.produceError(new Error('boom'))
})
