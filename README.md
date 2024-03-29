# Elements
###### Mag's JS library

This is a JavaScript Library for things I use often, as well as some helper functions.

Inspired by [Habitat](https://github.com/TodePond/Habitat), another library that I help out with!

## Installation

You can embed it into the browser like this: (I don't really use Modules, but I can convert it over to one if anyone wants it)

```html
<script src="Elements.js"></script>
```

## Usage

You _can_ use every function out-of-the-box, like so:

```js
Elements.Limit.clamp() // or any other function
```

But you can also install bits of the library into the global scope. For instance:

```js
const { Colour, Meal } = Elements
```

You can also easily rename each part to be whatever you like!

```js
const { Colour: col, Meal: lang } = Elements
```

## Documentation

There are currently 5 parts to this library - each individual and can technically be used on their own, but at the moment they are all in one file.

| Element | Usage                                    | Documentation                       |
| -       | -                                        | -                                   |
| Colour  | Making colours                           | [`/docs/Colour.md`](docs/Colour.md) |
| FSM     | Finite State Machine - Speaks for itself | [`/docs/FSM.md`](docs/FSM.md)       |
| Limit   | Restricting numbers between bounds       | [`/docs/Limit.md`](docs/Limit.md)   |
| Meal    | Consuming strings                        | [`/docs/Meal.md`](docs/Meal.md)     |
| Thread  | Multiple things in sort of parallel      | [`/docs/Thread.md`](docs/Thread.md) |

You can find files for any aspect of this library in the `/docs/` folder if you'd like to learn more.
