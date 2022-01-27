Elements.install(this)
Habitat.Colour.install(this)

let bodybg =      Colour.Void.rgb
let bodytxt =     Colour.White.rgb
let bg =          Colour.Black.rgb
let border =      Colour.Grey.rgb
let digit =       Colour.Cyan.rgb
let range =       Colour.Blue.rgb
let declaration = Colour.Orange.rgb
let variable =    Colour.White.rgb
let comment =     Colour.Green.rgb

// console.log({ bodybg, bodytxt, bg, border, digit, range, declaration, variable, comment })

let html = `<h1>ColourTode Syntax Highlighter</h1><style>
  body {
    background-color: ${bodybg};
    color: ${bodytxt};
    padding: 1em 2em;
  }
  pre {
    border: solid ${border};
    border-radius: 0.5em;
    display: inline-block;
    padding: 1em 2em; margin: 0;
    background: ${bg}; color: #fff;
    font-size: 1.2em;
    font-family: "Lucida Console", Courier, monospace;
  }
  span[digit] { color: ${digit} }
  span[range] { color: ${range} }
  span[declaration] { color: ${declaration} }
  span[variable] { color: ${variable} }
  span[comment] { color: ${comment}; font-style: italic }
  div[colour] {
    margin-left: 0.25em;
    display: inline-block;
    height: 0.5em;
    width: 0.5em;
    border-radius: 33.333%;
    border: 1.5px solid ${Colour.White.rgb};
  }
</style>
<pre><code>`

Colour.splash()

let start = performance.now()

let food = new Meal(`let colour_matcher = [?, 2 ... 7, 5]
let t three  = 3
// and so the wonderful TodePond colours begin...
let v Void   = [0, 0, 0]
let   Black  = [0, 0, 0]
let g Grey   = [1, 1, 2]
let s Silver = [5, 5, 6]
let w White  = [8, 8, 8]
let   Green  = [2, 9, 3]
let r Red    = [9, 1, 1]
let b Blue   = [2, 3, 9]
let y Yellow = [9, 6, 1]
let   Orange = [9, 3, 1]
let   Pink   = [9, 3, 3]
let r Rose   = [9, 3, 6]
let   Cyan   = [2, 6, 9]
let p Purple = [4, 1, 8]
`)

const {around, any, many, chain, upto, maybe, ignore} = Elements.Meal;

const DIGIT = food => {
  let first = food.first();
  if ('0123456789'.includes(first))
    return `<span digit>${food.eat(first)}</span>`
  return null
}

const unstyled_digit = food => {
  let first = food.first();
  if ('0123456789'.includes(first))
    return food.eat(first)
  return null
}

const RANGE = food => food.eat(
  any(
    around('?', '<span range>', '</span>'),
    chain(
      DIGIT, Meal._,
      around('...', '<span range>', '</span>'), Meal._,
      DIGIT
    )
  )
)

const ARRAY = food => food.eat(
  chain(
    '[', Meal._,
    any(RANGE, DIGIT), Meal._,
    ',', Meal._,
    any(RANGE, DIGIT), Meal._,
    ',', Meal._,
    any(RANGE, DIGIT), Meal._,
    ']'
  )
)

const COLOUR = food => {
  let styled = new Meal(food.plate).eat(ARRAY)
  let colour = food.eat(
    chain(
      ignore('['), ignore(Meal._),
      unstyled_digit, ignore(Meal._),
      ignore(','), ignore(Meal._),
      unstyled_digit, ignore(Meal._),
      ignore(','), ignore(Meal._),
      unstyled_digit, ignore(Meal._),
      ignore(']')
    )
  )
  if (colour == null) return null
  return styled + `<div colour style="background-color:${Colour.splash(+colour)}"></div>`
}

const VARIABLE = food => food.eat(
  around(many(
    any(...'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz_')
  ), '<span variable>', '</span>')
)

const VARCHAR = food => food.eat(
  around(any(
    ...'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz_'
  ), '<span variable>', '</span>')
)

const COMMENT = food => food.eat(
  around(chain(
    '//', upto('\n')
  ), '<span comment>', '</span>')
)

const DECLARATION = food => food.eat(
  chain(
    around('let', '<span declaration>', '</span>'),
    Meal.__,
    maybe(
      chain( VARCHAR, Meal.__ )
    ),
    VARIABLE,
    Meal._,
    '=',
    Meal._,
    any(COLOUR, ARRAY, RANGE, DIGIT)
  )
)

const LINE = food => food.eat(
  any(
    COMMENT,
    DECLARATION,
    ARRAY,
    RANGE,
    DIGIT
  )
)

html += food.eat(
  chain(
    maybe(many('\n')),
    many(
      chain(
        LINE,
        many('\n')
      )
    ),
    maybe(LINE)
  )
)

html += '</code></pre>'

document.body.innerHTML = html
console.log(food)

console.log(performance.now() - start)


