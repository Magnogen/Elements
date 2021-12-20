Elements.install(this)

let col = new Colour('cmy', 255, 75, 100)
col.hsl = [undefined, 0.5, 0.5]
console.log(col.rgb)
// a nice looking teal colour tbh
document.body.style.backgroundColor = `rgba(${col.r}, ${col.g}, ${col.b}, ${col.a})`
