var Callbacks = {};

var LocalEventEmitter = {
    on: (at, id, callback) => { return LocalEventEmitter.listen(at, id, callback) },
    listen: (at, id, callback) => {
        if (at == '') { return false }
        if (at in Callbacks) {
            Callbacks[at][id] = callback;
        } else {
            Callbacks[at] = {};
            Callbacks[at][id] = callback;
        }
        return id;
    },
    t: (at, data) => { return LocalEventEmitter.trigger(at, data) },
    trigger: (at, data) => {
        data = data || ''; var obj = Callbacks[at];
        for (var prop in obj) { if (obj.hasOwnProperty(prop)) { obj[prop](data) } }
    },
    rm: (at, id) => { return LocalEventEmitter.remove(at, id) },
    remove: (at, id) => { delete Callbacks[at][id] },
    removeAll: (at) => { delete Callbacks[at] }
};

module.exports = LocalEventEmitter;