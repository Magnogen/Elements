## FSM

```js
new FSM() // when installed onto the window
new Elements.FSM()
```

Creates a Finite State Machine.
FSMs have a bunch of methods too, so that you can get the most out of it, they're listed below.

### `(FSM).addState(name)`

Adds a potential state to the FSM, if its the first one added, it'll set the state to that one too.

### `(FSM).addEvent(name, default)`

Creates an event and assigns the default.
This new event is then propogated to all previously made states, and all future ones too.

### `(FSM).call(event, ...args)`

Essentially runs the event that is associated with the FSM's current state.
Arguments can be passed in with the `...args` parameters.

### `(FSM).set(state)`

Sets the state of the FSM to `state` and, if its successful, returns true; otherwise it returns false.

## Examples

And that's it! Pretty simple. You can use these principles to make a bunch of things.
For instance, here's a random distribution thing:

```js
let rng = new Elements.FSM()

rng.addState('start')
rng.addState('loop')
rng.addState('stop')
rng.addEvent('do', () => false)

let iters = 0
rng.start.do = () => {
  iters = 0
  rng.set('loop')
  return undefined
}
rng.loop.do = (prob=0.5) => {
  iters++
  if (Math.random() < prob) rng.set('stop')
  return undefined
}
rng.stop.do = () => iters

while (true) {
  let result = rng.call('do')
  if (result != undefined) {
    console.log(result)
    break
  }
}

// a few outputs
// > 2, 5, 9, 3, 3, 4, 2, 1, 3, 3
// ordered
// > 1, 2, 2, 3, 3, 3, 3, 4, 5, 9
```