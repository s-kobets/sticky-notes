export default class EventEmitter {
  private events = {};

  emit(eventName: string, data?: any) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  subscribe(eventName: string, fn: (data: any) => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
    };
  }
}
