
class EventRegister {

  static _Listeners = {
    count: 0,
    refs: {},
  }

  static addEventListener(eventName, callback) {
      EventRegister._Listeners.count++
      const eventId = 'l' + EventRegister._Listeners.count
      EventRegister._Listeners.refs[eventId] = {
        name: eventName,
        callback,
      }
      return eventId
  }

  static removeEventListener(id) {
      return delete EventRegister._Listeners.refs[id]
  }

  static removeAllListeners() {
    let removeError = false
    Object.keys(EventRegister._Listeners.refs).forEach(_id => {
      const removed = delete EventRegister._Listeners.refs[_id]
      removeError = (!removeError) ? !removed : removeError
    })
    return !removeError
  }

  static emitEvent(eventName, data) {
    Object.keys(EventRegister._Listeners.refs).forEach(_id => {
      if (
        EventRegister._Listeners.refs[_id] &&
        eventName === EventRegister._Listeners.refs[_id].name
      )
        EventRegister._Listeners.refs[_id].callback(data)
    })
  }

  /*
   * shortener
   */
  static on(eventName, callback) {
    return EventRegister.addEventListener(eventName, callback)
  }

  static rm(eventName) {
    return EventRegister.removeEventListener(eventName)
  }

  static rmAll() {
    return EventRegister.removeAllListeners()
  }

  static emit(eventName, data) {
    EventRegister.emitEvent(eventName, data)
  }

} 

export { EventRegister }