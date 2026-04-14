import { Queue } from "./toolkit/Queue.js";

function runQueueLoad(count) {
	const q = new Queue();

	for (let i = 0; i < count; i++) {
		q.enqueue(i);
	}

	while (!q.isEmpty()) {
		q.dequeue();
	}
}

function timeQueueLoad(count) {
	const start = performance.now();
	runQueueLoad(count);
	const end = performance.now();
	const elapsed = end - start;

	console.log(`Queue load test (${count} items): ${elapsed.toFixed(2)} ms`);
	return elapsed;
}

console.log("Queue load check:");
timeQueueLoad(10000);
timeQueueLoad(30000);




// Queue fodder
class Queue {
  constructor() {
    this.items = [];
  }

  // Add an item to the end (Enqueue)
  enqueue(element) {
    this.items.push(element);
  }

  // Remove an item from the front (Dequeue)
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow"; // Handle empty queue
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
