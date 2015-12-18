var Promise        = require('promise-polyfill'),
    after          = require('afterward'),
    CancelledError = require('./errors').CancelledError

module.exports = function eventuateLast (eventuate, cb) {
  if (typeof eventuate.destroyed !== 'function')
    throw new TypeError('first argument should be a non-basic eventuate')

  var done = eventuate.isDestroyed()
    ? Promise.reject(new CancelledError('eventuate already destroyed'))
    : new Promise(function lastPromise (resolve, reject) {
      var lastValue
      consumer.removed = consumerRemoved
      eventuate.consume(consumer)
      eventuate.destroyed.consume(onDestroyed)

      function onDestroyed () {
        resolve(lastValue)
      }

      function consumer (data) {
        lastValue = data
      }

      function consumerRemoved () {
        if (!eventuate.isDestroyed())
          reject(new CancelledError('eventuate consumer removed'))
        eventuate.removeConsumer(consumer)
        eventuate.destroyed.removeConsumer(onDestroyed)
      }
    })
  return after(done, cb)
}
