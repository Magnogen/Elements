# Elements
A JavaScript Library for things I use often, as well as some helper functions. Full documentation below.

Inspired by [Habitat](https://github.com/l2wilson94/Habitat), another library that I help out with!

## Installing
You can embed it into the browser like this: (I don't really use Modules, but I can convert this over to one if I ever see the need to)
```html
<script src="Elements.js"></script>
```

## Initialisation
You _can_ just use every function out-of-the-box, like so:
```js
Elements.Math.clamp() // or any other function
```
But you can also install the entire library into the `window` object. For instance:
```js
Elements.install(window) // or you can use .install(this)
```
You can also install specific parts of the library, like so:
```js
Elements.Colour.install(window) // or you can use .install(this)
```

## Sections
### Colour
```js
new Colour(type, ...data)
new Elements.Colour(type, ...data)
```
Creates a new Colour object from the data you provide. It can be of type `rgb[a]`, `hsl[a]` or even `cmy[a]`. The types would need to be specified using the `type` parameter.

You can also pass a previously created Colour object, and it will create a new Colour using the same values, effectively cloning it.

You can also change a value after it has been constructed, like so:
```js
var my_colour = new Colour() // with no arguments, it will initialise to black, or { r: 0, g: 0, b: 0, a: 255 }
my_colour.hsl = [30, 0.5, 0.75] // sets the colour to a light desaturated orange
my_colour.hsl = [60] // changes just the hue to 60* - a yellow colour - keeping the saturation and lightness the same
my_colour.hsl = [undefined, 1] // full saturation
```
For the last example there, I will probably add `.saturation, .lightness` or `.s, .l` values too, but thats not the case yet. Here are all the values you can cange and obtain:
- `.r`, `.g`, `.b`, `.a`: Red, Green, Blue and Alpha channels
- `.rgb`, `.rgba`: all the channels, excluding alpha for rgb, as a list
- `.hsl`, `.hsla`: the hue, saturation and lightness values as a list
- `.cmy`, `.cmya`: Cyan, Magenta and Yellow, the colour system for printers! (Might be useful, maybe...)
- `.isElementColour`: for determining if an object is a colour defined by this constructor (I'll probably change this to work better in future)

There are other helper functions under the `Colour` namespace - they include converters between RGB, HSL and CMY colour systems - and are used in the creation of colours. You can use them like so:
```js
Elements.Colour.rgb2hsl(red, green, blue) // returns list [hue, saturation, lightness]
Elements.Colour.hsl2rgb(hue, saturation, lightness) // returns list [red, green, blue]
Elements.Colour.rgb2cmy(red, green, blue) // returns list [cyan, magenta, yellow]
Elements.Colour.cmy2rgb(cyan, magenta, yellow) // returns list [red, green, blue]
```

I'll probably also do `hsl2cmy` and `cmy2hsl`, but I wouldn't know where to start with that yet.

Credit to [Kamil Kiełczewski on StackOverflow](https://stackoverflow.com/a/64090995) for the `hsl2rgb` and `rgb2hsl` functions

### Math
```js
Elements.Math.clamp(number, low, high)
Math.clamp(number, low, high)
```
Returns the number clamped between the low and high values, for instance:
```js
Math.clamp(5, 0, 10) // 5
Math.clamp(-0.6180339887, 0, 10) // 0
Math.clamp(42, 0, 10) // 10
```
I plan to add more kinds of 'clamping', things like a modified Sigmoid, wrap, inverted wrap and crop but that's not yet the case.
