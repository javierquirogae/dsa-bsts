class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val === current.val) return undefined;
    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    if (!this.root) return undefined;

    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) {
    if (!current) return undefined;

    if (val === current.val) return current;
    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    const visited = [];

    function traverse(node) {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    if (this.root) traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    const visited = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }

    if (this.root) traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
```javascript
  * Return an array of visited nodes. */
  dfsPostOrder() {
    const visited = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }

    if (this.root) traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    const visited = [];
    const queue = [];

    if (this.root) queue.push(this.root);

    while (queue.length > 0) {
      const node = queue.shift();
      visited.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    if (!this.root) return undefined;
  
    let current = this.root;
    let parent = null;
    let isLeftChild = false;
  
    while (current && current.val !== val) {
      parent = current;
      if (val < current.val) {
        current = current.left;
        isLeftChild = true;
      } else {
        current = current.right;
        isLeftChild = false;
      }
    }
  
    if (!current) return undefined;
  
    if (!current.left && !current.right) {
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (!current.right) {
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (!current.left) {
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else {
      let successor = this.findMinNode(current.right);
  
      // If the successor is the right child of the current node
      if (current.right === successor) {
        successor.left = current.left;
  
        if (current === this.root) {
          this.root = successor;
        } else if (isLeftChild) {
          parent.left = successor;
        } else {
          parent.right = successor;
        }
      } else {
        // If the successor is deeper in the right subtree
        let successorParent = current;
        let successorCurrent = current.right;
  
        while (successorCurrent.left) {
          successorParent = successorCurrent;
          successorCurrent = successorCurrent.left;
        }
  
        successorParent.left = successorCurrent.right;
        successorCurrent.left = current.left;
        successorCurrent.right = current.right;
  
        if (current === this.root) {
          this.root = successorCurrent;
        } else if (isLeftChild) {
          parent.left = successorCurrent;
        } else {
          parent.right = successorCurrent;
        }
      }
    }
  
    return current;
  }
  

  /** Helper function to find the minimum node in a subtree */
  findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    return this.checkBalance(this.root) !== -1;
  }

  /** Helper function to check if a subtree is balanced */
  checkBalance(node) {
    if (!node) return 0;

    const leftHeight = this.checkBalance(node.left);
    const rightHeight = this.checkBalance(node.right);

    if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    let parent = null;

    while (current) {
      if (current.left && !current.right) {
        return this.findMaxNode(current.left).val;
      }

      if (current.right && !current.right.left && !current.right.right) {
        if (!current.right.left && !current.right.right) {
          return current.val;
        }
      }

      parent = current;
      current = current.right;
    }

    return parent.val;
  }

  /** Helper function to find the maximum node in a subtree */
  findMaxNode(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
