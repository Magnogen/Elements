Elements.install(this)

let teal = new Colour('cmy', 255, 75, 100)
teal.s = 0.5
teal.l = 0.5
console.log('teal', teal.hsl)
// a nice looking teal colour tbh
document.body.style.backgroundColor = `rgba(${teal.r}, ${teal.g}, ${teal.b}, ${teal.a})`

let peach = new Colour(teal)
peach.r = 255
console.log('peach', peach.hsl)
// a cute peach colour lmao
document.body.style.backgroundColor = `rgba(${peach.r}, ${peach.g}, ${peach.b}, ${peach.a})`

