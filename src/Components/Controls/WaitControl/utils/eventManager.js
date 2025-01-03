const eventManager = {
  list: new Map(),

  on(event, callback) {
    this.newFunction(event);

    this.list.get(event).push(callback);

    return this;
  },

  off(event = null) {
    this.list.delete(event);
    return this;
  },

  emit(event, ...args) {
    if (!this.list.has(event)) {
      return false;
    }
    this.list
      .get(event)
      .forEach(callback => setTimeout(() => callback.call(null, ...args), 0));

    return true;
  },

  newFunction(event) {
    return this.list.has(event) || this.list.set(event, []);
  },
};

export default eventManager;
