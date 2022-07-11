## Meal

In order to make a meal of a string, pass the string into the `new Elements.Meal(...)` (or just `new Meal(...)`, when installed) constructor. In this new object, it is referred to as the meal's `plate`. 

This creates a Meal object that has a few properties - the most notable of which is [`.eat()`](#meal-eat-edible-flags). There are a few more though, and they're listed below.

### `(Meal).finished()`

Returns a boolean that tells if there's any more to eat from the meal's `plate`.

### `(Meal).first(check)`

- If `check` is undefined, it returns the first character of the meal's `plate`. 

- If `check` is a number (n), it returns the first n characters of the meal's `plate`.

- If `check` is a string, it returns a boolean indicating if the meal's `plate` starts with the string.

### `(Meal).eat(edible, flags)`

This is probably the most important function of any created `new Meal()` object.

It usually only takes one argument, an `edible`, but it can also take an object used to set flags for eating, such as whether it's case-sensitive or not.

The `edible` can either be a string, or a function. Strings are the easiest to explain.

#### Eating a String

```js
let food = new Meal('Hello, World!');

food.eat('potato'); // returns null
food.eat('World!'); // null
food.eat('hello');  // null
food.eat('Hello,'); // "Hello,"
food.eat('World!'); // null, there's meant to be a space at the start
food.eat(' ');      // ' '
food.eat('World!'); // 'World!', now it works
```

When a string is eaten, it checks if the current plate starts with that string.

If the plate _does_, it trims the string off the front, and returns it.

If the plate does _not_, it simply returns `null`. This is to differentiate between an unsuccessful eating, and a successful empty string.

#### Eating a Function

```js
let food = new Meal('Hello, World!');

// this function would eat any of these
//   'hello', 'helllo', 'hellllo', etc
// but not
//   'helo', 'heo', 'ello', or 'hell'

food.eat((copy) => { // this might seem long, but don't worry - I've split it up, and there are ways to shorten it!
    let result = '', current;

    current = food.eat('he'); // Eat 'he'
    if (current == null) return null;
    else result += current;

    current = food.eat('l');
    while (current != null) { // Eat as many 'l's as possible
      result += current;
      current = food.eat('l');
    }
    if (content.length < 2) return null; // Make sure its at least two 'l's

    current = food.eat('o'); // Eat an 'o'
    if (current == null) return null;
    else result += current;

    return result;
});
```

When a function is eaten, it essentially clones the meal itself, and passes that clone as the argument of the function. It then executes it and checks the result of the function.

If the function returns `null`, it disregards the attempt and does nothing, returning `null`. As it passes a clone of the meal, the changes are temporary.

If it returns anything else it'll set its own data to the data of the copy, and return the result that the function returns.

This is helpful for doing things like:

- Eating variable amounts of a string.

- Eating a series of strings in order.

- Producing a successful eat, even if the eat wasn't successful.

  (good for an optional edible in a series of edibles - like whitespace.)

- Eating anything _but_ a string.

- And quite a bit more!

### Helper functions

Throughout my use of this library, I've found that a few common functions tend to appear.
Because of this, I've added a few helper functions to the library too, they are split into two groups - _Fundamentals_, and _Helpers_.

They work by simply returning a function, and of course, the arguments can be functions too - this means you can use them inside eachother. Be careful - this can quite easily become complicated!

Some of them are defined really simply, just a few lines each. But they are helpful nonetheless! 

#### `Meal.any(...edibles)`

Eats _any_ of the edibles provided - these can be functions or strings - they work exactly the same as regular edibles.

#### `Meal.chain(...edibles)`

Eats all of the edibles provided, one after the other - like a chain.

#### `Meal.many(edible)`

Eats the provided edible 1 or more times. _Many_ times, if you will.

#### `Meal.around(edible, before, after)`

> DEPRECATED - see [`Meal.map()`](#meal-map-edible-mapper)

Eats an edible as usual, but instead or returning the content, it'll start it with the string `before`, and end it with `after`.

It is recommended to use `Meal.map()`, (^ link above) as then you can simply provide a function to deal with the output - it has a lot more functionality. 

#### `Meal.map(edible, mapper)`

Eats an edible as usual, and if it would return `null`, it does so. Otherwise, it'll pass the result into the `mapper` function, and return its returned value instead. 

Useful for turning things into tokens or sanitising the result into a different format.

#### `Meal.not(edible)`

If it can eat the edible, it returns `null`. If it can't, it'll instead return the meal's first character.

#### `Meal.ignore(edible)`

If it can eat the edible, it returns an empty string. If it can't, it'll return `null`.

#### `Meal.maybe(edible)`

If it can eat the edible, it'll return the result of the eating. If it can't, it'll just return an empty string.

This means it can't return `null` - meaning it'll always be successful.

#### `Meal.upto(edible)`

Eats all the characters _up to_, but not including the specified edible.

If you'd like to code this yourself, it'd be ` many( not( edible ) ) `

#### `Meal._`

A shorthand for optional whitespace - if you wanted to write it out yourself, it'll just be `maybe( many( any( ' ', '\t' ) ) )`.

#### `Meal.__`

Like `Meal._`, but it's not optional - writing it out yourself, it'd be `many( any( ' ', '\t' ) )`.

### Examples

Here are some examples for edibles that can be used in certain circumstances. They make use of the helper functions, so you can assume that each snippet starts with this:

```js
const { any, chain, many, maybe, not } = Elements.Meal;
```

You can use that to quickly get all the functions out of the Meal namespace. If you want to get more information on it, it's called [Object Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring).

The examples are as follows, you can eat them by simply eating the variable the snippet creates:

- Strings, with escape-able quotes

  ```js
  const STRING = food => food.eat(
      chain(
          '"',
          maybe( many( any(
              '\\"', 
              not( '"' )
          ) ) ),
          '"'
      )
  )
  ```

I'll give some more later, let me know if you come up with some interesting ideas!
