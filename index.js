var Promise        = require('promise-polyfill'),
    after          = require('afterward'),
    CancelledError = require('./errors').CancelledError

module.exports = function eventuateLast (eventuate, cb) {
  if (typeof eventuate.consume !== 'function')
    throw new TypeError('first argument must be an eventuate')

  var done = eventuate.isDestroyed()
    ? Promise.reject(new CancelledError('eventuate already destroyed'))
    : new Promise(function lastPromise (resolve, reject) {
      var lastValue
      var consumption = eventuate.consume(onData, onError)
      consumption.once('end', cancel)
      eventuate.once('destroy', finish)

      function onData (data) {
        lastValue = data
      }

      function onError (err) {
        reject(err)
        cleanup()
      }

      function finish () {
        resolve(lastValue)
        cleanup()
      }

      function cancel () {
        reject(new CancelledError('eventuate consumer removed'))
        cleanup()
      }

      function cleanup () {
        consumption.removeListener('end', cancel)
        consumption.end()
      }
    })
  return after(done, cb)
}
