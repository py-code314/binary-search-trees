// Import Node class
import Node from './node.js'

/* Create a Tree class */
export default class Tree {
  constructor(array) {
    this.array = array
    this.root = this.buildTree(this.array)
  }

  /* Return a sorted array with duplicates removed */
  processArray(array) {
    // Make a set from array
    const arraySet = new Set(array)
    // Convert it back to array and sort
    const sortedArray = [...arraySet].sort((a, b) => a - b)

    return sortedArray
  }

  /* A recursive function to create a balanced binary search tree */
  sortedArrayToBSTRecur(array, start, end) {
    // Base case
    if (start > end) return null

    //Find middle element
    let midIndex = start + Math.floor((end - start) / 2)

    // Create root node
    let rootNode = new Node(array[midIndex])

    // Create left sub tree
    rootNode.left = this.sortedArrayToBSTRecur(array, start, midIndex - 1)

    // Create right sub tree
    rootNode.right = this.sortedArrayToBSTRecur(array, midIndex + 1, end)

    return rootNode
  }

  /* Creates a balanced binary search tree from the given array */
  buildTree(array) {
    // Process the array input
    const processedArray = this.processArray(array)

    // Assign values to start and end
    const startIndex = 0
    const endIndex = processedArray.length - 1

    return this.sortedArrayToBSTRecur(processedArray, startIndex, endIndex)
  }

  /* Recursively inserts a given value into the binary search tree */
  insertRecursive(value, node) {
    // Base case
    if (node === null) {
      return new Node(value)
    }

    // Duplicate values aren't allowed
    if (value === node.data) {
      return node
    }

    // Compare the value to current node value
    if (value < node.data) {
      // Add to left
      node.left = this.insertRecursive(value, node.left)
    } else if (value > node.data) {
      // Add to right
      node.right = this.insertRecursive(value, node.right)
    }

    return node
  }

  /* Inserts a given value into the binary search tree */
  insert(value) {
    this.insertRecursive(value, this.root)
  }

  /* Deletes a given value from the binary search tree */
  deleteItem(value) {
    let currentNode = this.root
    let previousNode = null

    // Find the node with the given value
    while (currentNode != null && currentNode.data != value) {
      previousNode = currentNode
      if (value < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    // Value isn't found in the tree
    if (currentNode === null) return this.root

    // Node to be deleted has at most one child
    if (currentNode.left === null || currentNode.right === null) {
      let childNode =
        currentNode.left === null ? currentNode.right : currentNode.left

      // Node to be deleted is the root node
      if (previousNode === null) return childNode

      // Matched node is internal node
      if (previousNode.left === currentNode) {
        previousNode.left = childNode
      } else {
        previousNode.right = childNode
      }
    } else {
      // Matched node has left and right children
      let prevNode = null
      let tempNode = currentNode.right

      // Traverse the tree and find the next highest node
      while (tempNode.left != null) {
        prevNode = tempNode
        tempNode = tempNode.left
      }

      // Check for the presence of left child for matched node
      if (prevNode != null) {
        prevNode.left = tempNode.right
      } else {
        currentNode.right = tempNode.right
      }

      currentNode.data = tempNode.data
    }
  }

  /* Search for the given value in the binary search tree */
  find(value) {
    let currentNode = this.root

    while (currentNode) {
      // Compare the value to current node value
      if (value < currentNode.data) {
        currentNode = currentNode.left
      } else if (value > currentNode.data) {
        currentNode = currentNode.right
      } else {
        return currentNode
      }
    }

    return null
  }

  // Traverse the tree in breadth-first level order
  levelOrderIterative(callback) {
    // Throw error if the argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed.')
    }

    // Base case
    const root = this.root
    if (root === null) return

    // Initialize queue
    const queue = [root]

    while (queue.length > 0) {
      // Get current node
      const currentNode = queue.shift()
      // Apply callback
      callback(currentNode)

      // Push the left node into queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left)
      }

      // Push the right node into queue
      if (currentNode.right !== null) {
        queue.push(currentNode.right)
      }
    }
  }

  // Recursive function to traverse the tree in level order
  levelOrderRecursive(callback, queue = [this.root]) {
    // Throw error if the argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    // Base case
    if (!queue.length) return

    // Get current node and apply callback
    let currentNode = queue.shift()
    callback(currentNode)

    // Push the next node into queue
    if (currentNode.left !== null) queue.push(currentNode.left)
    if (currentNode.right !== null) queue.push(currentNode.right)

    this.levelOrderRecursive(callback, queue)
  }

  /* Perform a pre-order traversal of the tree, visiting nodes in the order
    of root, left, right */
  preOrder(callback) {
    // Throw error if the argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    // Base case
    const root = this.root
    if (root === null) return

    // Initialize stack
    const stack = [root]

    while (stack.length > 0) {
      // Get current node and apply callback
      let currentNode = stack.pop()
      callback(currentNode)

      // Push the right node first and left node second to get the reverse order
      if (currentNode.right !== null) stack.push(currentNode.right)
      if (currentNode.left !== null) stack.push(currentNode.left)
    }
  }

  /* A helper function for performing a pre-order traversal of the tree */
  traverseRootFirst(callback, currentNode) {
    // Base case
    if (currentNode === null) return

    // Do the callback first, then traverse left, then traverse right
    callback(currentNode)
    this.traverseRootFirst(callback, currentNode.left)
    this.traverseRootFirst(callback, currentNode.right)
  }

  /* A recursive method for pre-order tree traversal */
  preOrderRecursive(callback) {
    // Throw error if argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    // Initialize current node
    const currentNode = this.root

    // Call recursive helper function
    this.traverseRootFirst(callback, currentNode)
  }

  /* A helper function for performing a in-order traversal of the tree */
  traverseRootMiddle(callback, currentNode) {
    // Base case
    if (currentNode === null) return

    // Traverse left, then root, then traverse right
    this.traverseRootMiddle(callback, currentNode.left)
    callback(currentNode)
    this.traverseRootMiddle(callback, currentNode.right)
  }

  /* Performs an in-order traversal of the tree, visiting nodes in the
   order of left, root, right */
  inOrder(callback) {
    // Throw error if argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    // Initialize current node
    const currentNode = this.root

    // Call recursive helper function
    this.traverseRootMiddle(callback, currentNode)
  }

  /* A helper function for performing a post-order traversal of the tree */
  traverseRootLast(callback, currentNode) {
    // Base case
    if (currentNode === null) return

    // Traverse left, then right, then root
    this.traverseRootLast(callback, currentNode.left)
    this.traverseRootLast(callback, currentNode.right)
    callback(currentNode)
  }

  /* Perform a post-order traversal of the tree, visiting nodes in the order
   of left, right, root */
  postOrder(callback) {
    // Throw error if argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    // Initialize current node
    const currentNode = this.root

    // Call recursive helper function
    this.traverseRootLast(callback, currentNode)
  }

  /* Calculate the height of the given node */
  calculateHeight(node) {
    // Start at -1 for edge based case
    let nodeHeight = -1

    // Initialize queue with matched node
    const queue = [node]

    while (queue.length) {
      nodeHeight++
      const levelNumber = queue.length

      // Process all nodes in the same level in parallel
      for (let i = 0; i < levelNumber; i++) {
        // Get current node
        const currentNode = queue.shift()

        // Add left and right nodes to queue
        if (currentNode.left) {
          queue.push(currentNode.left)
        }
        if (currentNode.right) {
          queue.push(currentNode.right)
        }
      }
    }

    return nodeHeight
  }

  /* Recursively calculates the height of a binary tree from a given node */
  calculateHeightRecursive(node) {
    // Base case
    if (node === null) return -1

    // Calculate heights of left and right sub-trees
    const leftSubTreeHeight = this.calculateHeightRecursive(node.left)
    const rightSubTreeHeight = this.calculateHeightRecursive(node.right)

    return Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1
  }

  /* Returns the height of the given node */
  height(value) {
    // Find the match
    const matchedNode = this.find(value)
    if (!matchedNode) return null

    // return this.calculateHeight(matchedNode)
    return this.calculateHeightRecursive(matchedNode)
  }

  /* Recursive function to find the depth of given node */
  getDepthRecursive(node, value) {
    // Base cases
    if (node === null) return null
    if (value === node.data) return 0

    // Value is less than current node value
    if (value < node.data) {
      const leftDepth = this.getDepthRecursive(node.left, value)
      return leftDepth === null ? null : leftDepth + 1
    }

    // Value is greater than current node value
    const rightDepth = this.getDepthRecursive(node.right, value)
    return rightDepth === null ? null : rightDepth + 1
  }

  /* Calculates the depth of the given node from the root node */
  depth(value) {
    const currentNode = this.root

    return this.getDepthRecursive(currentNode, value)
  }

  /* Recursively checks if the tree is balanced starting from the given node */
  isBalancedRecursive(node) {
    // Base case
    if (node === null) return true

    // Get the heights of left and right sub-trees
    const leftSubTreeHeight = this.calculateHeightRecursive(node.left)
    const rightSubTreeHeight = this.calculateHeightRecursive(node.right)

    // Check the difference between the two
    if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1) return false

    // Check balance of left and right sub-trees
    return (
      this.isBalancedRecursive(node.left) &&
      this.isBalancedRecursive(node.right)
    )
  }

  /* Checks if the tree is balanced */
  isBalanced() {
    // Initialize current node
    const root = this.root

    return this.isBalancedRecursive(root)
  }

  /* Rebalance the tree if it is not balanced */
  rebalance() {
    // Check for the tree balance
    const balanced = this.isBalanced()

    if (!balanced) {
      const sortedArray = []

      // Create sorted array
      this.inOrder((node) => sortedArray.push(node.data))

      // Build the tree again
      this.root = this.buildTree(sortedArray)
    }
  }

  /* Print the tree in a pretty format */
  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }
}

