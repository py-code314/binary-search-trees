// Import Node class
import Node from './node.js'

// Tree class
class Tree {
  constructor(array) {
    this.array = array
    this.root = this.buildTree(this.array)
  }

  // Helper function to process array
  processArray(array) {
    // Make a set from array
    const arraySet = new Set(array)
    // Convert it back to array and sort
    const sortedArray = [...arraySet].sort((a, b) => a - b)

    return sortedArray
  }

  // Function to build a binary tree
  buildTree(array) {
    const processedArray = this.processArray(array)

    const startIndex = 0
    const endIndex = processedArray.length - 1

    return this.sortedArrayToBSTRecur(processedArray, startIndex, endIndex)
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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
// const array = [1, 7, 4, 23, 8, 9, 4, 6345, 324]

// Create an instance of Tree class
const bst = new Tree(array)

bst.prettyPrint(bst.root)

// bst.levelOrderIterative((node) => console.log(node.data))
