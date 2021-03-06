# Elements

A JavaScript Library for things I use often, as well as some helper functions. Full documentation below.

Inspired by [Habitat](https://github.com/l2wilson94/Habitat), another library that I help out with!

## Installing

You can embed it into the browser like this: (I don't really use Modules, but I can convert this over to one if I ever see the need to)

```html
<script src="Elements.js"></script>
```

Or you can use my API: (this is still WIP, but it'll work for the time being)

```html
<script src="https://api.magnogen.net/elem"></script>
```

## Initialisation

You _can_ just use every function out-of-the-box, like so:

```js
Elements.Limit.clamp() // or any other function
```

But you can also install bits of the library into the global domain. For instance:

```js
const { Colour, Meal } = Elements
```

You can also easily rename them to be whatever you like!

```js
const { Colour: col, Meal: lang } = Elements
```

## Documentation

There are currently 3 parts to this library - each individual and can technically be used on their own, but at the moment they are all in one file.

| Element | Usage                              | Documentation                       |
| -       | -                                  | -                                   |
| Colour  | Making colours                     | [`/docs/Colour.md`](docs/Colour.md) |
| Limit   | Restricting numbers between bounds | [`/docs/Limit.md`](docs/Limit.md)   |
| Meal    | Consuming strings                  | [`/docs/Meal.md`](docs/Meal.md)     |

You can find files for any aspect of this library in the `/docs/` folder if you'd like to learn more.
