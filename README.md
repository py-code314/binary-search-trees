# Solution for Project: Binary Search Trees for The Odin Project

## Overview

This is a solution for the [Binary Search Trees](https://www.theodinproject.com/lessons/javascript-binary-search-trees#project-solution) project . Goal of this project is to practice creating and manipulating balanced binary search trees. A `Tree` class is created with methods inside it to add, remove, find, and traverse the tree. We can also check if the tree is balanced or not by calling the respective method.


### List of methods included:

#### Main methods:

- `buildTree(array)`: Creates a balanced binary search tree from the given array.
- `insert(value)`: Inserts a given value into the binary search tree.
- `deleteItem(value)`: Deletes a given value from the binary search tree.
- `find(value)`: Finds a given value in the binary search tree.
- `levelOrderIterative(callback)`: Traverses the tree in breadth-first level order using iterative method.
- `levelOrderRecursive(callback)`: Traverses the tree in breadth-first level order using recursive method.
- `preOrder(callback)`: Traverses the tree in depth-first pre-order (root, left, right) using iterative method.
- `preOrderRecursive(callback)`: Traverses the tree in depth-first pre-order (root, left, right) using recursive method.
- `inOrder(callback)`: Traverses the tree in depth-first in-order (left, root, right).
- `postOrder(callback)`: Traverses the tree in depth-first post-order (left, right, root).
- `height(value)`: Returns the height of the given node (number of edges between the node and the farthest leaf node).
- `depth(value)`: Returns the depth of the given node from the root node (number of edges between the node and the root node).
- `isBalanced()`: Returns true if the tree is balanced, false otherwise.
- `rebalance()`: Rebalances the tree if it is not balanced.
- `prettyPrint()`: Prints the tree in a pretty format.


#### Helper methods:

- `processArray(array)`: Returns a sorted array with duplicates removed.
- `sortedArrayToBSTRecursive(array, start, end)`: A recursive function to create a balanced binary search tree.
- `insertRecursive(value, node)`: Recursively inserts a given value into the binary search tree.
- `traverseRootFirst(callback, currentNode)`: A helper function for performing a pre-order traversal of the tree.
- `traverseRootMiddle(callback, currentNode)`: A helper function for performing a in-order traversal of the tree.
- `traverseRootLast(callback, currentNode)`: A helper function for performing a post-order traversal of the tree.
- `calculateHeightIterative(node)`: Iteratively calculates the height of a binary tree from a given node.
- `calculateHeightRecursive(node)`: Recursively calculates the height of a binary tree from a given node.
- `getDepthRecursive(node, value)`: Recursively finds the depth of a given node from the root node.
- `isBalancedRecursive(node)`: Recursively checks if the tree is balanced starting from the given node.