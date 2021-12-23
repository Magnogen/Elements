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
Elements.Limit.clamp() // or any other function
```
But you can also install the entire library into the `window` object. For instance:
```js
Elements.install(window) // or you can use .install(this) in a browser
```
You can also install specific parts of the library, like so:
```js
Elements.Colour.install(window) // or you can use .install(this) in a browser
```

## Sections
### Colour
```js
new Colour(type, ...data) // when installed onto the window
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
- `.rgb`, `.rgba`: all the RGB channels, excluding alpha for rgb, as a list
- `.h`, `.s`, `.l`: Hue, Saturation and Lightness values
- `.hsl`, `.hsla`: all the values, excluding alpha for hsl, as a list
- `.c`, `.m`, `.y`: Cyan, Magenta and Yellow, the colour system for printers! (Might be useful, maybe...)
- `.cmy`, `.cmya`: all the CMY channels, excluding alpha for cmy, as a list
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

### Limit
#### Clamp
```js
Elements.Limit.clamp(number, low, high)
Limit.clamp(number, low, high)
```
![Clamp Graph](https://user-images.githubusercontent.com/25611707/147256564-1a441c7c-f117-444c-8496-1e7134d06e01.png)

The `clamp()` function returns the number but restricted between `low` and `high`

#### Wrap
```js
Elements.Limit.wrap(number, low, high)
Limit.wrap(number, low, high)
```
![Wrap Graph](https://user-images.githubusercontent.com/25611707/147256614-a646cdac-544b-469d-a030-acd28c7fa96c.png)

The `wrap()` function is a modified version of the modulo (%) operator

#### Fold
```js
Elements.Limit.fold(number, low, high)
Limit.fold(number, low, high)
```
![Fold Graph](https://user-images.githubusercontent.com/25611707/147256972-7b3cb09e-e083-4a75-a6f5-5f8190917b4b.png)

The `fold()` function is like `wrap()`, but is more continuous, and actually probably the least useful

#### Sigmoid
```js
Elements.Limit.sigmoid(number, low, high)
Limit.sigmoid(number, low, high)
```
![Sigmoid Graph](https://user-images.githubusercontent.com/25611707/147257188-8cc356ce-ab7a-4782-a435-cec61dda8e8a.png)

The `sigmoid()` function is a modified version of a relatively well known mathematical function, widely used as an activator function in the field of AI, I haven't actually used it yet, but I thought it'd be a bit cool to play around with it in a future project
