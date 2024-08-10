// Readable


// Transform


// Writable

const { Readable, Writable, Transform } = require('node:stream');
const crypto = require('node:crypto');

const input = new Readable({
  read() {
    for (let i = 0; i < 100000; i++) {
      this.push(crypto.randomUUID());
    }
    this.push(null); // finish read
  }
});

const toUpperCase = new Transform({
  transform(chunk, _, callback) {
    callback(null, chunk.toString().toUpperCase())
  }
})

const output = new Writable({
  write(chunk, _, callback) {
    console.log(chunk.toString());
    callback(); // finish write
  },
});

input.pipe(toUpperCase).pipe(output);
