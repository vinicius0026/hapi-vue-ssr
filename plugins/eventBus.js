const EventEmitter = require('events')

class EventBus extends EventEmitter {}

module.exports = {
  name: 'EventBus',

  register: (server, options) => {
    server.app.eventBus = new EventBus()
  }
}
