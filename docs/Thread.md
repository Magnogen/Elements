## Thread

```js
new Thread(genfunc) // when installed onto the window
new Elements.Thread(genfunc)
```

Threads are interesting, they aren't *really* threads, more like a bunch of things that can run whenever and pause at certain times to let other things run too.
I'm not very good at explaining things.

I use this mostly for pausing a task every frame, or doing as much of something as possible in a frame.

Helpful.

Things like canvas pixel manipulation work well for this.
Just pass in a generator function that `yield`s at every iteration in the loop and boom. You're done.

```js
new Thread(function* () {
    
    let canvas = document.querySelector('canvas')
    canvas.width = canvas.height = 512
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
            if ((yield) == Thread.waited) ctx.putImageData(pixels, 0, 0)
        }
    }
    ctx.putImageData(pixels, 0, 0);

}).start()
```

That just fills the canvas with random colours.

I'll do more docs for this, but in the meantime, you can [go see how it works](https://github.com/Magnogen/Elements/blob/main/Elements.js#L339) - I tried to comment Thread for future reference.
