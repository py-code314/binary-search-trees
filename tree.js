// Import Node class
import Node from './node.js'

// Tree class
class Tree {
  constructor(array) {
    this.array = array
    this.root = this.buildTree(this.array)
    this.nodeDepth = 0
  }

  // Helper function to process array
  processArray(array) {
    // Make a set from array
    const arraySet = new Set(array)
    // Convert it back to array and sort
    const sortedArray = [...arraySet].sort((a, b) => a - b)

    return sortedArray
  }

  // Recursive function to build a binary tree
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
    // console.log(rootNode)

    return rootNode
  }

  // Function to build a binary tree
  buildTree(array) {
    const processedArray = this.processArray(array)

    const startIndex = 0
    const endIndex = processedArray.length - 1

    return this.sortedArrayToBSTRecur(processedArray, startIndex, endIndex)
  }

  // Insert a node
  insert(value) {
    // let currentNode = this.root
    this.insertRecursive(value, this.root)
  }

  // Recursive function to insert a node
  insertRecursive(value, node) {
    if (node === null) {
      return new Node(value)
    }
    // Duplicate values aren't allowed
    if (value === node.data) {
      return node
    }
    if (value < node.data) {
      // Add to left
      node.left = this.insertRecursive(value, node.left)
    } else if (value > node.data) {
      // Add to right
      node.right = this.insertRecursive(value, node.right)
    }
    return node
  }

  // Delete a given node
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

  // Return the node with given value
  find(value) {
    let currentNode = this.root

    while (currentNode) {
      if (value < currentNode.data) {
        this.nodeDepth++
        // console.log('Left:', this.nodeDepth)
        currentNode = currentNode.left
      } else if (value > currentNode.data) {
        this.nodeDepth++
        // console.log('Right:', this.nodeDepth)
        currentNode = currentNode.right
      } else {
        return currentNode
      }
    }

    return null
  }

  // Traverse the tree in breadth-first level order
  levelOrderIterative(callback) {
    // Throw error if no argument is passed
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    let currentNode = this.root

    // Tree is empty
    if (currentNode === null) return

    // Initialize queue
    const queue = []
    queue.push(currentNode)

    // Loop through the queue array
    while (queue.length) {
      currentNode = queue[0]
      // Apply callback
      callback(currentNode)

      // Push left child
      if (currentNode.left !== null) {
        queue.push(currentNode.left)
      }

      // Push right child
      if (currentNode.right !== null) {
        queue.push(currentNode.right)
      }

      // Remove first node
      queue.shift(currentNode)
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

    // Apply callback
    let currentNode = queue.shift()
    callback(currentNode)

    // Push the next node into queue
    if (currentNode.left !== null) queue.push(currentNode.left)
    if (currentNode.right !== null) queue.push(currentNode.right)

    this.levelOrderRecursive(callback, queue)
  }

  // Tree traversal starting with the root
  preOrder(callback) {
    // Throw error if the argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }
    let currentNode = this.root
    if (currentNode === null) return
    // Initialize stack array
    const stack = [currentNode]

    while (stack.length > 0) {
      currentNode = stack.pop()
      callback(currentNode)

      if (currentNode.right !== null) stack.push(currentNode.right)
      if (currentNode.left !== null) stack.push(currentNode.left)
    }
  }

  // Recursive helper function with root first
  traverseRootFirst(callback, currentNode) {
    if (currentNode === null) return
    callback(currentNode)
    this.traverseTree(callback, currentNode.left)
    this.traverseTree(callback, currentNode.right)
  }

  // Recursive method for pre-order traversal
  preOrderRecursive(callback) {
    // Throw error if the argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    let currentNode = this.root

    // Helper function
    this.traverseRootFirst(callback, currentNode)
  }

  // Recursive helper function with root middle
  traverseRootMiddle(callback, currentNode) {
    if (currentNode === null) return

    this.traverseRootMiddle(callback, currentNode.left)
    callback(currentNode)
    this.traverseRootMiddle(callback, currentNode.right)
  }

  // Recursive method for in-order tree traversal
  inOrder(callback) {
    // Throw error if argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    let currentNode = this.root

    this.traverseRootMiddle(callback, currentNode)
  }

  // Recursive helper function with root last
  traverseRootLast(callback, currentNode) {
    if (currentNode === null) return

    this.traverseRootLast(callback, currentNode.left)

    this.traverseRootLast(callback, currentNode.right)
    callback(currentNode)
  }

  // Recursive method for post-order tree traversal
  postOrder(callback) {
    // Throw error if argument isn't a function
    if (typeof callback !== 'function') {
      throw new Error('No callback function passed')
    }

    let currentNode = this.root

    this.traverseRootLast(callback, currentNode)
  }

  // Find the height of the node with given value
  height(value) {
    // Find the match
    let matchedNode = this.find(value)
    if (!matchedNode) return null

    // Start at -1 for edge based case
    let nodeHeight = -1
    // Initialize queue with matched node
    let queue = [matchedNode]
    while (queue.length) {
      nodeHeight++
      let levelNumber = queue.length

      // Process all nodes in the same level
      for (let i = 0; i < levelNumber; i++) {
        let currentNode = queue.shift()
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

  // Find the depth of given node
  depth(value) {
    this.nodeDepth = 0
    const matchedNode = this.find(value)
    if (matchedNode) {
      return this.nodeDepth
    }
    return null
  }

  // Check for balanced tree
  isBalanced() {
    let currentNode = this.root

    let count = 0
    while (currentNode.left !== null || currentNode.right !== null) {
      count++
      if (currentNode.left !== null) {
        currentNode = currentNode.left
      } else if (currentNode.right !== null) {
        currentNode = currentNode.right
      }
    }
    return count
  }

  // Print node like a tree
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

// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const array = [
  1, 7, 4, 23, 8, 9, 4, 2, 3, 5, 7, 9, 67, 6345, 324, 50, 100, 75, 85,
]

// Create an instance of Tree class
const bst = new Tree(array)

bst.prettyPrint(bst.root)

// console.log(bst.isBalanced())
console.log(bst.height(9))
console.log(bst.height(75))
console.log(bst.height(4))
console.log(bst.height(2))
console.log(bst.height(50))
console.log(bst.height(100))
console.log(bst.height(3))
console.log(bst.height(8))
console.log(bst.height(23))
console.log(bst.height(324))
console.log(bst.height(6345))
