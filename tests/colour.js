const { Colour } = Elements

let teal = new Colour('cmy', 255, 75, 100)
teal.s = 0.5
teal.l = 0.5
console.log('teal', teal.hsl)
// a nice looking teal colour tbh
document.body.style.backgroundColor = teal.toHex()

let peach = new Colour(teal)
peach.r = 255
console.log('peach', peach.rgb)
// a cute peach colour lmao
document.body.style.backgroundColor = peach.toRGB()


