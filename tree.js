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

  // Print node like a tree
  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }
}


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]


// Create an instance of Tree class
const bst = new Tree(array)
bst.prettyPrint(bst.root)



