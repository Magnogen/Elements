const { Thread, FSM } = Elements;
let rng = new FSM()

rng.addState('start')
rng.addState('loop')
rng.addState('stop')
rng.addEvent('do', () => false)

let iters = 0
rng.start.do = () => {
  iters = 0
  rng.set('loop')
}
rng.loop.do = (prob=0.333) => {
  iters++
  if (Math.random() < prob) rng.set('stop')
}
rng.stop.do = () => iters

let i = 0
while (i < 10) {
  let res = rng.call('do')
  if (res != undefined) {
    console.log(res)
    i++
    rng.set('start')
  }
}