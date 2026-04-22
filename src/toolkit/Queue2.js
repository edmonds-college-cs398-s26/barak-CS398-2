// @ts-check

/**
 * Node class for the linked list.
 */
class Node {
  /**
   * @param {unknown} value
   * @param {Node | null} next
   */
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Implement a queue using a linked list. 
 * enqueue() should add an item to the back of the queue by creating a 
 *   new node and updating the queue's tail pointer.
 * dequeue() should remove and return the item from the front of the queue by
 *   updating the queue's head pointer to the next node.
 * isEmpty() should return true if the queue has no items, and false otherwise.
 * size() should return the number of items in the queue.
 * The queue should be able to hold any type of value.
 */
export class Queue2 {
  /** @type {Node | null} */
  head = null;

  /** @type {Node | null} */
  tail = null;

  /** @type {number} */
  _size = 0;

  /**
   * @param {unknown} value
   */
  enqueue(value) {
    const newNode = new Node(value);
    
    if (this.tail === null) {
      // Queue is empty
      this.head = newNode;
    } else {
      // Add to the back
      this.tail.next = newNode;
    }
    
    this.tail = newNode;
    this._size += 1;
  }

  /**
   * @returns {unknown}
   */
  dequeue() {
    if (this.head === null) {
      return undefined;
    }

    const value = this.head.value;
    this.head = this.head.next;
    this._size -= 1;

    // If queue becomes empty, reset tail
    if (this.head === null) {
      this.tail = null;
    }

    return value;
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.head === null;
  }

  /**
   * @returns {number}
   */
  size() {
    return this._size;
  }
}