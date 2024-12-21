// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

// For loadFactor, see the following:
// If the array is 16 units long, and 14 are filled, 14 / 16 = 0.875.
// That is above the static loadFactor of 0.75, meaning new buckets must be made.

class Node {
  constructor(key, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add new Node to end of list
  append(key, value) {
    const newNode = new Node(key, value);
    let currentNode;

    if (!this.head) {
      this.head = newNode;
    } else {
      currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }

    this.size += 1;
  }

  // Add new Node to front of list
  prepend(key, value) {
    const newNode = new Node(key, value);
    let currentNode;

    if (!this.head) {
      this.head = newNode;
    } else {
      currentNode = this.head;
      this.head = newNode;
      newNode.next = currentNode;
    }

    this.size += 1;
  }

  size() {
    return this.size;
  }

  head() {
    return this.head;
  }

  tail() {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  at(index) {
    if (index > this.size - 1 || index < 0) return;
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  pop() {
    let currentNode;
    if (!this.head) {
      return;
    } else {
      currentNode = this.head;
      for (let i = 0; i < this.size - 1; i++) {
        currentNode = currentNode.next;
      }
      console.log(`Removed Node: ${currentNode.value}`);
      currentNode.next = null;
    }
  }

  contains(value) {
    let currentNode;
    if (!this.head) {
      return;
    } else {
      currentNode = this.head;
      for (let i = 0; i < this.size; i++) {
        if (currentNode.value === value) return true;
        currentNode = currentNode.next;
      }
      return false;
    }
  }

  containsKey(key) {
    let currentNode;
    if (!this.head) {
      return;
    } else {
      currentNode = this.head;
      for (let i = 0; i < this.size; i++) {
        if (currentNode.key === key) return currentNode.value;
        currentNode = currentNode.next;
      }
      return false;
    }
  }

  find(value) {
    let currentNode;
    if (!this.head) {
      return;
    } else {
      currentNode = this.head;
      for (let i = 1; i < this.size + 1; i++) {
        if (currentNode.value === value) return i;
        currentNode = currentNode.next;
      }
      return null;
    }
  }

  findKey(key) {
    let currentNode;
    if (!this.head) {
      return;
    } else {
      currentNode = this.head;
      for (let i = 1; i < this.size + 1; i++) {
        if (currentNode.key === key) return true;
        currentNode = currentNode.next;
      }
      return false;
    }
  }

  insertAt(key, value, index) {
    let currentNode;
    if (index > this.size - 1 || index < 0) return;
    currentNode = this.head;
    for (let i = 1; i < index - 1; i++) {
      currentNode = currentNode.next;
    }
    const newNode = new Node(key, value);
    let placeholder;
    placeholder = currentNode.next;
    currentNode.next = newNode;
    newNode.next = placeholder;

    this.size += 1;
  }

  removeAt(index) {
    let currentNode;
    let previousNode;
    if (index > this.size - 1 || index < 0) return;
    currentNode = this.head;
    for (let i = 1; i < index; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = currentNode.next;
  }

  toString() {
    console.log("Converting Linked List to String:");
    let string = "";
    let currentNode;
    if (!this.head) {
      string = null;
      return string;
    } else {
      currentNode = this.head;
      while (currentNode.next) {
        string += ` ( ${currentNode.value} ) ->`;
        currentNode = currentNode.next;
      }
      string += ` ( ${currentNode.value} ) -> ${null}`;
      return string;
    }
  }
}

// HashMap Implentation Below
class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.buckets = new Array(16).fill(null).map(() => new LinkedList());
    this.capacity = this.buckets.length;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    // Hash the key
    let hashCode = this.hash(key);

    // Prevent default JS behavior, limit to current buckets
    if (hashCode < 0 || hashCode >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    // Add to bucket using hashCode
    this.buckets[hashCode].append(key, value);
  }

  get(key) {
    let hashCode = this.hash(key);
    return this.buckets[hashCode].containsKey(key);
  }

  has(key) {
    let hashCode = this.hash(key);
    return this.buckets[hashCode].findKey(key);
  }

  remove(key) {}

  length() {}

  clear() {}

  keys() {}

  values() {}

  entries() {}
}

const test = new HashMap();
test.set("apple", "red");
console.log(test.get("apple"));
