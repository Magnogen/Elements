// jshint esversion: 11
const Elements = {};

// Elements: Magnogen's personal JavaScript Library
// You can use it too, I like sharing things
// If you like any of this, or dislike it to the point of wanting to make it better,
//   please submit a pull request at https://github.com/Magnogen/Elements

// Colour
//   Creating and editing colours
//   RGBA, HSLA and CMYA are supported
//   Might include CNS in future too
//   https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.5/grstatgraph/p0edl20cvxxmm9n1i9ht3n21eict.htm
//   ^ Helpful resource

{
  // hsl2rgb() and rgb2hsl() adapted from Kamil Kiełczewski's answer from StackOverflow
  // https://stackoverflow.com/a/64090995
  
  // h[0-360] s[0-1] l[0-1] -> r[0-255] g[0-255] b[0-255]
  const hsl2rgb = (h=0, s=1, l=0.5) => {
    let a = s * Math.min(l, 1-l);
    let f = (n, k=(n+(h+360)/30)%12) => l - a * Math.max(Math.min(k-3, 9-k, 1), -1);                 
    return [255*f(0), 255*f(8), 255*f(4)]
  }
  // r[0-255] g[0-255] b[0-255] -> h[0-360] s[0-1] l[0-1]
  const rgb2hsl = (_r=0, _g=0, _b=0) => {
    let [r, g, b] = [_r/255, _g/255, _b/255];
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b), f=(1-Math.abs(v+v-c-1)); 
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return [60*(h<0?h+6:h), f ? c/f : 0, (v+v-c)/2]
  }
  
  // c[0-255] m[0-255] y[0-255] <-> r[0-255] g[0-255] b[0-255]
  const cmy2rgb = (c=0, m=0, y=0) => [ 255-c, 255-m, 255-y ];
  const rgb2cmy = cmy2rgb;
  
  Elements.Colour = class Colour {
    constructor(type, ...data) {
      this.r = 0; this.g = 0; this.b = 0; this.a = 255;
      if (typeof type == 'string') {
        if (!['rgb','rgba','hsl','hsla','cmy','cmya'].includes(type.toLowerCase())) throw {
          name: 'Elements.Colour',
          message: `Expected Colour Type and received ${ type }`
        };
        else if (['hsl', 'hsla'].includes(type)) this.hsla = data;
        else if (['cmy', 'cmya'].includes(type)) this.cmya = data;
        else this.rgba = data;
      } else if (typeof type === 'object' && type instanceof Colour) {
        this.rgba = type.rgba;
      }
    }
    toRGB() { return `rgba(${this.rgba.map(n => 0|n).join(', ')})` }
    toHex() { return '#'+this.rgba.map(c => (0|c).toString(16).padStart(2,'0')).join('') }
    
    // this.r, this.g, this.b, and this.a are all actual values
    get rgb() { return [this.r, this.g, this.b] }
    get rgba() { return [this.r, this.g, this.b, this.a] }
    set rgb(data) { this.rgba = [data, this.a] }
    set rgba(_data) {
      let data = _data.flat(Infinity);
      this.r = data[0]===undefined ? this.r : data[0];
      this.g = data[1]===undefined ? this.g : data[1];
      this.b = data[2]===undefined ? this.b : data[2];
      this.a = data[3]===undefined ? this.a : data[3];
    }
    
    get h() { return this.hsl[0] }
    get s() { return this.hsl[1] }
    get l() { return this.hsl[2] }
    set h(hue) { let b4 = this.hsla; this.hsla = [hue  , b4[1], b4[2], b4[3]] }
    set s(sat) { let b4 = this.hsla; this.hsla = [b4[0], sat  , b4[2], b4[3]] }
    set l(lig) { let b4 = this.hsla; this.hsla = [b4[0], b4[1], lig  , b4[3]] }
    get hsl() { return rgb2hsl(this.r, this.g, this.b) }
    get hsla() { return [...this.hsl, this.a] }
    set hsl(data) { this.hsla = [...data, this.a]; }
    set hsla(_data) {
      let data = _data.flat(Infinity);
      let b4 = this.hsl;
      data[0] = data[0] ? data[0] : b4[0];
      data[1] = data[1] ? data[1] : b4[1];
      data[2] = data[2] ? data[2] : b4[2];
      data = [...hsl2rgb(data[0], data[1], data[2]), data[3]];
      this.r = data[0];
      this.g = data[1];
      this.b = data[2];
      this.a = data[3]===undefined ? this.a : data[3];
    }
    
    get c() { return this.cmy[0] }
    get m() { return this.cmy[1] }
    get y() { return this.cmy[2] }
    set c(cyn) { let b4 = this.cmya; this.cmya = [cyn  , b4[1], b4[2], b4[3]] }
    set m(mag) { let b4 = this.cmya; this.cmya = [b4[0], mag  , b4[2], b4[3]] }
    set y(yel) { let b4 = this.cmya; this.cmya = [b4[0], b4[1], yel  , b4[3]] }
    get cmy() { return [255-this.r, 255-this.g, 255-this.b] }
    set cmy(data) { this.cmya = [data, this.a] }
    get cmya() { return [...this.cmy, this.a] }
    set cmya(_data) {
      let data = _data.flat(Infinity);
      this.r = data[0]===undefined ? this.r : 255-data[0];
      this.g = data[1]===undefined ? this.g : 255-data[1];
      this.b = data[2]===undefined ? this.b : 255-data[2];
      this.a = data[3]===undefined ? this.a : data[3];
    }
  }
}

// Finite State Machine
//   all things finite-statey

{
  Elements.FSM = class FSM {
    #state;
    #states;
    #event_defaults;
    constructor() {
      this.#state = undefined;
      this.#states = {};
      this.#event_defaults = {};
    }
    addState(name) {
      if (this.#state == undefined) this.#state = name;
      this.#states[name] = true;
      this[name] = { ...this.#event_defaults }
    }
    addEvent(name, normal = ()=>undefined) {
      this.#event_defaults[name] = normal;
      for (let state of Object.keys(this.#states))
        this[state][name] = normal;
    }
    call(event, ...args) {
      return this[this.#state][event](...args);
    }
    set(state) {
      if (!this.#states[state]) return false;
      this.#state = state;
      return true;
    }
  }
}

// Limit
//   Restricting numbers between two values
//   Clamp, Wrap, Fold and Sigmoid are supported

{
  Elements.Limit = class Limit {
    constructor(min, max) {
      [this.min, this.max] = min < max ? [min, max] : [max, min];
    }
    clamp(n) {
      if (n < this.min) return this.min;
      if (n > this.max) return this.max;
      return n;
    }
    wrap(n) {
      let N = n;
      while (N < this.min) N += this.max-this.min;
      while (N > this.max) N -= this.max-this.min;
      return N;
    }
    fold(n) {
      let N = (n-this.min) % (2*(this.max-this.min)) + this.min;
      if (N > this.max) return 2*this.max - N;
      return N;
    }
    sigmoid(n) {
      let diff = this.max-this.min;
      return diff / (1 + Math.exp(4 * (this.min-n) / diff + 2)) + this.min;
    }
  };
  
  Elements.Limit.clamp = (n, a, b) => {
    if (b < a) return Elements.Limit.clamp(n, b, a);
    if (n < a) return a;
    if (n > b) return b;
    return n;
  };
  Elements.Limit.wrap = (n, a, b) => {
    if (b < a) return Elements.Limit.wrap(n, b, a);
    let N = n;
    while (N < a) N += b-a;
    while (N > b) N -= b-a;
    return N;
  };
  Elements.Limit.fold = (n, a, b) => {
    if (b < a) return Elements.Limit.fold(n, b, a);
    let N = (n - a) % (2 * (b - a)) + a;
    if (N > b) return 2 * b - N;
    return N;
  };
  Elements.Limit.sigmoid = (n, a, b) => {
    if (b < a) return Elements.Limit.sigmoid(n, b, a);
    return (b - a) / (1 + Math.exp(4 * (a - n) / (b - a) + 2)) + a;
  };
}

// Meal
//   Consuming a string
//   Good for programming languages and syntax highlighting and parsing and such

{
  Elements.Meal = class Meal {
    constructor(plate, tokensOnly=false) {
      if (typeof plate != 'string') throw {
        name: 'Elements.Meal',
        message: `Expected String and received ${ typeof plate }`
      };
      this.plate = plate;
      this.tokensOnly = tokensOnly;
      this.index  = 0;
      this.line   = 0;
      this.column = 0;
    }
    finished() { return this.plate.length == this.index }
    first(check) {
      if (this.finished()) return;
      if (typeof check == 'string')
        return this.plate.substring(this.index, this.index+check.length) == check;
      if (typeof check == 'number')
        return this.plate.substring(this.index, this.index+check+1);
      if (typeof check == 'undefined')
        return this.plate[this.index];
    }
    leftover() {
      return this.plate.substring(this.index, this.plate.length);
    }
    eat(edible, tokensOnly=this.tokensOnly) {
      if (typeof edible == 'string') {
        if (!this.first(edible)) return null;
        this.index += edible.length;
        const lines = edible.split('\n');
        this.line += lines.length - 1;
        if (lines.length > 1) this.column = 0;
        this.column += lines[lines.length-1].length;
        return edible;
      }
      else if (typeof edible == 'function') {
        const copy = new Elements.Meal(this.plate, tokensOnly);
        copy.index = this.index;
        copy.line = this.line;
        copy.column = this.column;
        const out = edible(copy);
        if (out === null) return null;
        this.index = copy.index;
        this.line = copy.line;
        this.column = copy.column;
        return out;
      }
    }
  }
  Elements.Meal.any = (...edibles) => food => {
    for (let edible of edibles) {
      const value = food.eat(edible);
      if (value != null) return value;
    }
    return null;
  }
  Elements.Meal.around = (edible, start, end) => food => {
    const value = food.eat(edible);
    if (value == null) return null;
    return start + value + end;
  }
  Elements.Meal.chain = (...edibles) => food => {
    let content = [], current;
    for (let edible of edibles) {
      current = food.eat(edible)
      if (current == null) return null;
      else content.push(current);
    }
    return food.tokensOnly ? content : content.join('');
  }
  Elements.Meal.many = edible => food => {
    let content = [], current;
    while (true) {
      current = food.eat(edible);
      if (current === null) return null;
      content.push(current);
    }
    if (content.length == 0) return null;
    return food.tokensOnly ? content : content.join('');
  }
  Elements.Meal.map = (edible, mapper) => food => {
    const value = food.eat(edible);
    if (value == null) return null;
    if (Array.isArray(value)) return mapper(...value);
    return mapper(value);
  };
  Elements.Meal.n = (edible, amount) => food => {
    let content = [], current;
    for (let i = 0; i < amount; i++) {
      current = food.eat(edible);
      if (current === null) return null;
      content.push(current);
    }
    return food.tokensOnly ? content : content.join('');
  }
  Elements.Meal.need = (edible, messenger) => food => {
    const content = food.eat(edible)
    if (content == null) throw {
      name: 'Elements.Meal.Need',
      message: typeof messenger == 'function' ? messenger(food) : messenger
    };
    return content;
  };
  Elements.Meal.not = edible => food => food.eat(edible) == null ? food.eat(food.first()) : null;
  
  Elements.Meal.ignore = edible => food => food.eat(edible) == null ? null : ''; 
  Elements.Meal.maybe = edible => food => (food.eat(edible) ?? '');
  Elements.Meal.upto = edible => food => food.eat(Elements.Meal.many(Elements.Meal.not(edible))); 
  Elements.Meal._ = food => {
    const out = food.eat( Elements.Meal.maybe(Elements.Meal.many(Elements.Meal.any(' ','\t'))) );
    if (out === null) return null;
    return food.tokensOnly ? out : out.join('');
  }
  Elements.Meal.__ = food => {
    const out = food.eat( Elements.Meal.many(Elements.Meal.any(' ', '\t')) );
    if (out === null) return null;
    return food.tokensOnly ? out : out.join('');
  }
}

// Thread
//   Multiple things in sort of parallel
//   Support for asynchronous frames and things

{
  let threads = [];
  Elements.Thread = class Thread {
    constructor(generator=function*(){yield;}) {
      this.content = generator(this);
      this.complete = false;
      this.task_complete = false;
      this.waited_a_frame
    }
    start() { threads.push(this); }
  };
  Elements.Thread.frame = Symbol.for('Elements.Thread.frame');
  Elements.Thread.stop = Symbol.for('Elements.Thread.stop');
  Elements.Thread.waited = Symbol.for('Elements.Thread.waited');
  
  (async () => {
    // forever try and compute threads
    while (true) {
      let last = performance.now();
      // mark every running thread as ready to compute
      for (let thread of threads) {
        thread.task_complete = false;
        thread.waited_a_frame = true;
      }
      // compute as many tasks in all threads as possible in a 60th of a second (frame)
      while (performance.now() - last < 1000/60) {
        for (let self of threads) {
          // if there's nothing left of the thread
          // or if it asked to wait 'till the next frame (end of task)
          if (self.complete || self.task_complete) continue;
          let waited;
          if (self.waited_a_frame) {
            waited = Elements.Thread.waited;
            self.waited_a_frame = false;
          }
          // compute next part of thread, allowing for async
          const next = await self.content.next(waited);
          // generator done means thread is done
          if (next.done)
            self.complete = true;
          // thread asks to wait a frame
          else if (next.value == Elements.Thread.frame)
            self.task_complete = true;
          // thread asks to prematurely end thread
          else if (next.value == Elements.Thread.stop)
            self.complete = true;
          // ignore undefinedness
          else if (next.value == undefined);
          // log a yellow string if yielded because yellow is cool
          else if (typeof next.value == 'string')
            console.log(`%c ~ ${next.value} `, 'color: #ff0');
          // log anything else if yielded
          else console.log(`%c ~ `, 'color: #ff0', next.value);
        }
      }
      await new Promise(requestAnimationFrame); // wait a frame
    }
  })();
}
