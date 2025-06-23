import Tree from './tree.js'

// Function to create an array with random numbers
function generateRandomArray() {
  const randomArray = []

  for (let i = 0; i < 15; i++) {
    const randomNumber = Math.floor(Math.random() * 100)
    randomArray.push(randomNumber)
  }
  // console.log(randomArray)
  return randomArray
}

// const array = generateRandomArray()
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

// Generate tree
const bst = new Tree(array)

// Print tree
console.log('Tree structure:')
bst.prettyPrint(bst.root)

// Confirm that the tree is balanced
console.log('Balanced:', bst.isBalanced())

// Print elements in level order
console.log('Print Elements in Level Order with Iterative Method:')
bst.levelOrderIterative((node) => console.log(node.data))
console.log('Print Elements in Level Order with Recursive Method:')
bst.levelOrderRecursive((node) => console.log(node.data))

// Print elements in pre-order
console.log('Print Elements in Pre-order with Iterative Method:')
bst.preOrder((node) => console.log(node.data))
console.log('Print Elements in Pre-order with Recursive Method:')
bst.preOrderRecursive((node) => console.log(node.data))

// Print elements in post-order
console.log('Print Elements in Post-order:')
bst.postOrder((node) => console.log(node.data))

// Print elements in in-order
console.log('Print Elements in In-order:')
bst.inOrder((node) => console.log(node.data))

// Add a few numbers to make the tree unbalanced
console.log('Insert numbers to Make the Tree Unbalanced')
bst.insert(100)
bst.insert(101)
bst.insert(102)
bst.insert(103)
bst.insert(104)
console.log('Print Unbalanced Tree:')
bst.prettyPrint(bst.root)

// Confirm that the tree is unbalanced
console.log('Balanced:', bst.isBalanced())

// Rebalance the tree
bst.rebalance()
console.log('Print Rebalanced Tree:')
bst.prettyPrint(bst.root)

// Confirm that the tree is rebalanced
console.log('Balanced:', bst.isBalanced())

// Print rebalanced tree elements in level order
console.log('Print Rebalanced Elements in Level Order:')
bst.levelOrderRecursive((node) => console.log(node.data))

// Print rebalanced elements in pre-order
console.log('Print Rebalanced Elements in Pre-order:')
bst.preOrderRecursive((node) => console.log(node.data))

// Print rebalanced elements in post-order
console.log('Print Rebalanced Elements in Post-order:')
bst.postOrder((node) => console.log(node.data))

// Print rebalanced elements in in-order
console.log('Print Rebalanced Elements in In-order:')
bst.inOrder((node) => console.log(node.data))

// Find and delete an item
// console.log(bst.find(12))
// bst.deleteItem(12)
// bst.prettyPrint(bst.root)

// Calculate height and depth of a node
// console.log(bst.height(12))
// console.log(bst.depth(2))



