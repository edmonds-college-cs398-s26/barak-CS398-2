// @ts-check

import { test, assertEqual } from "./test.js";
import { Queue } from "./Queue.js";

export function runTests() {
  test("new queue starts empty", () => {
    const q = new Queue();
    assertEqual(q.isEmpty(), true);
  });

  test("enqueue followed by dequeue returns the same value", () => {
    const q = new Queue();
    q.enqueue(42);
    assertEqual(q.dequeue(), 42);
  });

  test("queue preserves FIFO order", () => {
    const q = new Queue();
    q.enqueue("a");
    q.enqueue("b");
    q.enqueue("c");

    assertEqual(q.dequeue(), "a");
    assertEqual(q.dequeue(), "b");
    assertEqual(q.dequeue(), "c");
  });
}
