var test           = require('tape'),
    last           = require('..')

test('requries a non-basic eventuate', function (t) {
  t.plan(1)

  t.throws(function () {
    last({}, function () {})
  }, TypeError, 'throws TypeError')
})
