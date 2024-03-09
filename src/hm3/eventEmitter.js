class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (eventListener) => eventListener !== listener
      );
    }
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(...args));
    }
  }

  rawListeners(eventName) {
    return this.events[eventName];
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

/** Task 1 */

const myEmitter = new EventEmitter();

function c1() {
  console.log("an event occurred!");
}

function c2() {
  console.log("yet another event occurred!");
}

myEmitter.on("eventOne", c1);
myEmitter.on("eventOne", c2);

myEmitter.once("eventOnce", () => console.log("eventOnce once fired"));
myEmitter.once("init", () => console.log("init once fired"));

myEmitter.on("status", (code, msg) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit("eventOne");
myEmitter.emit("eventOnce");
myEmitter.emit("eventOne");
myEmitter.emit("init");
myEmitter.emit("init");
myEmitter.emit("eventOne");
myEmitter.emit("status", 200, "ok");

console.log(myEmitter.listenerCount("eventOne"));
console.log(myEmitter.rawListeners("eventOne"));

myEmitter.off("eventOne", c1);
console.log(myEmitter.listenerCount("eventOne"));
myEmitter.off("eventOne", c2);
console.log(myEmitter.listenerCount("eventOne"));

/**
 * It wasn't mentioned that the task 2 should be run from a separate file or with separate npm command
 */
console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END OF TASK 1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

/** Task 2 */

const http = require("http");

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit("begin");
    const startTime = Date.now();

    asyncFunc(...args)
      .then((data) => {
        this.emit("data", data);
        const endTime = Date.now();
        const executionTime = endTime - startTime;
        this.emit("end", executionTime);
      })
      .catch((error) => {
        this.emit("error", error);
        const endTime = Date.now();
        const executionTime = endTime - startTime;
        this.emit("end", executionTime);
      });
  }
}

const fetchFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error("Failed to parse JSON: " + error.message));
          }
        });
      })
      .on("error", (error) => {
        reject(new Error("Failed to fetch data: " + error.message));
      });
  });
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", (executionTime) =>
  console.log("Done with execute. Execution time:", executionTime + "ms")
);
withTime.on("data", (data) => console.log("Data received:", data));
withTime.on("error", (error) => console.error("Error:", error.message));

withTime.execute(fetchFromUrl, "http://jsonplaceholder.typicode.com/posts/1");
