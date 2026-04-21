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

test("dequeue on empty queue returns undefined", () => {
  const q = new Queue();
  assertEqual(q.dequeue(), undefined);
});

test("size increases with enqueue", () => {
  const q = new Queue();
  q.enqueue(1);
  assertEqual(q.size(), 1);
  q.enqueue(2);
  assertEqual(q.size(), 2);
});

test("size decreases with dequeue", () => {
  const q = new Queue();
  q.enqueue(1);
  q.enqueue(2);
  q.dequeue();
  assertEqual(q.size(), 1);
});

test("isEmpty returns false when queue has items", () => {
  const q = new Queue();
  q.enqueue(42);
  assertEqual(q.isEmpty(), false);
});

test("queue becomes empty after dequeuing all items", () => {
  const q = new Queue();
  q.enqueue("x");
  q.dequeue();
  assertEqual(q.isEmpty(), true);
  assertEqual(q.size(), 0);
});

test("enqueue different data types", () => {
  const q = new Queue();
  const obj = { key: "value" };
  const arr = [1, 2, 3];

  q.enqueue(obj);
  q.enqueue(arr);
  q.enqueue(null);

  assertEqual(q.dequeue(), obj);
  assertEqual(q.dequeue(), arr);
  assertEqual(q.dequeue(), null);
});
}
