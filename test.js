const apple = { one: 1, two: 2, three: 3 };
const orange = { one: 4, two: 5, three: 6 };

const array = [apple, orange];

console.log(array);

const keys = Object.keys(apple);
const time = 1;

console.log(array[time][keys[1]]);
