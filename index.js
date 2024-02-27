/**
 * In task was asked just to return the value and nothing about that if we need to see the result in terminal or not
 * I added minor comment with console.log to be able to see the result in terminal if it's needed
 */
function getRandomNumber() {
  // console.log(Math.floor(Math.random() * 1000) + 1)
  return Math.floor(Math.random() * 1000) + 1;
}

getRandomNumber();

export default getRandomNumber;
