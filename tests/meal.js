const { Meal } = Elements
const { any, many, __ } = Meal;

let food = new Meal(`print     "Hello, World!"`, true);

console.log(food.eat(many(
  any(
    'print',
    __,
    '"'
  )
)))
