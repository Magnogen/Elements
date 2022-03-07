## Colour

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

These are all the values you can change and obtain in a Colour object:

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
