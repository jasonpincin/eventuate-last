var eventuate = require('eventuate-core'),
    last      = require('..')

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
