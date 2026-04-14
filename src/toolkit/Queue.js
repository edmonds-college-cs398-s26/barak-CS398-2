// @ts-check

export class Queue {
  /** @type {unknown[]} */
  a = [];
  /**
   * @param {unknown} value
   */
  enqueue(value) {
    this.a.push(value);
  }

  /**

   */
  dequeue() {
    return this.a.shift();
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.a.length === 0;
  }

  /**
   * @returns {number}
   */
  size() {
    return this.a.length;
  }
}
