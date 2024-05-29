//sample code documentation
/** 
 A song

 *  @typedef {Object} Song
 * This objects do something
 * @property {string} title - The title
 * @property {string} artist - The artist
 * @property {number} year - The year
 **/

/**
 * This function calculate two numbers.
 *
 * @function  calculateSum
 * @param {number} num1 - The first number
 * @param {number} num2 - The second number
 * @returns {number} - The sum of num1 and num2
 **/

function calculateSum(num1, num2) {
  return num1 + num2;
}

/**
 * This function checks if a number is even.
 *
 * @function isEven
 * @param {number} num - The number to check
 * @returns {boolean} True if the number is even, otherwise false
 */
function isEven(num) {
  return num % 2 === 0;
}

/**
 * @typedef {(number|string)} NumberLike
 */

/**
 * @param  {NumberLike}
 */