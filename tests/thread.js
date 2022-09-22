const $ = query => document.querySelector(query)
const { Thread, Colour } = Elements

let vignette = new Thread(async function* () {
  let c = $('canvas')
  let ctx = c.getContext('2d')
  
  let { width, height } = c
  
  const pow = (func, amount) => {
    let result = 1
    for (let i = 0; i < amount; i++) result *= func()
    return result
  }
  
  let i = 0
  let last = performance.now()
  while (true) {
    if (i++ > 1000000*width/512) break
    yield
    
    let x = pow(Math.random, 6) * width/2
    let y = height * Math.random()
    if (Math.random() < 0.5) x = width-x
    if (Math.random() < 0.5) [x, y] = [y, x]
    let r = Math.random()*8*width/512
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2*Math.PI, false)
    
    let col = new Colour('rgb', 0, 255, 0)
    col.s = Math.random() * 0.1
    col.l = Math.random() * 0.1
    col.a = Math.random() * 18
    if (Math.random() < 0.01) col.a *= 255/36

    ctx.fillStyle = ctx.strokeStyle = col.toHex()
    if (Math.random() < 0.2) ctx.fill()
    else ctx.stroke()
  }
  yield 'done'
  
})

new Thread(function* () {
    
  let canvas = document.querySelector('canvas')
  canvas.width = canvas.height = 1024
  let ctx = canvas.getContext('2d')
  let { width, height } = canvas

  let pixels = ctx.getImageData(0, 0, width, height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = 4 * (x + width*y)
      pixels.data[i + 0] = Math.floor(Math.random() * 255)
      pixels.data[i + 1] = Math.floor(Math.random() * 255)
      pixels.data[i + 2] = Math.floor(Math.random() * 255)
      pixels.data[i + 3] = 255
      if ((yield) == Thread.waited) {
        ctx.putImageData(pixels, 0, 0);
      }
    }
  }
  ctx.putImageData(pixels, 0, 0);

  vignette.start()

}).start()
  
  
  
  
  
  
