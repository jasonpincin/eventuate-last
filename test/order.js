var test      = require('tape'),
    eventuate = require('eventuate-core'),
    last      = require('..')

test('last executes in expected order #1', function (t) {
  t.plan(2)

  var event1 = eventuate()
  var event2 = eventuate()
  var last2Happened = false
  var event2Happened = false

  last(event1, function consume (data) {
    t.equals(event2Happened, true)
    t.equals(last2Happened, false)
  })
  event2(function () {
    event2Happened = true
  })
  last(event2, function consume (data) {
    last2Happened = true
  })
  event1.produce('a')
  event2.produce('b')
  event1.destroy()
  event2.destroy()
})

test('last executes in expected order #2', function (t) {
  t.plan(2)

  var event1 = eventuate()
  var event2 = eventuate()
  var last2Happened = false
  var event2Happened = false

  last(event1, function consume (data) {
    t.equals(event2Happened, true)
    t.equals(last2Happened, false)
  })
  last(event2, function consume (data) {
    last2Happened = true
  })
  event2(function () {
    event2Happened = true
  })
  event1.produce('a')
  event2.produce('b')
  event1.destroy()
  event2.destroy()
})
