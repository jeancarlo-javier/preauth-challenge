/**
 * Finds the first subset of two numbers in the array that sums up to N.
 * Optimized to O(n) time complexity.
 * @param {number[]} M - An array of integers.
 * @param {number} N - The target sum.
 * @returns {number[]} An array containing the first pair of numbers that sum to N, or NULL if no such pair exists.
 */
function findFirstPairWithSum(M: Array<number>, N: number): number[] | null {
  // Input validation
  if (!Array.isArray(M))
    throw new TypeError('The first argument must be an array of integers.')
  if (typeof N !== 'number')
    throw new TypeError('The second argument must be a number.')

  const complements = new Set<number>()

  for (let i = 0; i < M.length; i++) {
    const complement = N - M[i]

    // Check if the current number's complement exists in the set
    if (complements.has(complement)) {
      return [complement, M[i]]
    }

    // Add the current number's complement to the set
    complements.add(M[i])
  }

  return null
}

console.log(findFirstPairWithSum([2, 5, 8, 14, 0], 10)) // [2, 8]
