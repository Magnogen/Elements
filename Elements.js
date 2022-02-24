// jshint esversion: 10
const Elements = {};

/* Main installer
 *   for istalling everything into a scope (or technically an object)
 */

{
  Elements.install = function (global) {
    if (Elements.installed) return;
    
    if (!Elements.Colour.installed) Elements.Colour.install(global);
    if (!Elements.Limit.installed) Elements.Limit.install(global);
    if (!Elements.Meal.installed) Elements.Meal.install(global);
    
    Elements.installed = true;
  }
}

/* Colour
 *   Creating and editing colours
 *   RGBA, HSLA and CMYA are supported
 */

{
  Elements.Colour = function (type, ...data) {
    if (!new.target) throw {
      name: 'SyntaxError',
      message: 'Elements.Colour() must be called with new'
    };
    if (typeof type === 'string') {
      if (!['rgb', 'rgba', 'hsl', 'hsla', 'cmy', 'cmya'].includes(type.toLowerCase())) throw {
        name: 'SyntaxError',
        message: `Colour type must be of "HSL", "RGB" or "CMY", recieved "${type}"`
      };
      if (['hsl', 'hsla'].includes(type)) this.hsla = data;
      else if (['cmy', 'cmya'].includes(type)) this.cmya = data;
      else this.rgba = data;
    } else if (typeof type === 'object' && type.isElementColour) {
      Object.assign(this, type);
    }
  }
  Elements.Colour.prototype = { r: 0, g: 0, b: 0, a: 255, isElementColour: true }
  
  Elements.Colour.prototype.render = function (type='rgba') {
    return `rgba(${this.rgba.map(Math.round).join(', ')})`;
  }
  
  Reflect.defineProperty(Elements.Colour.prototype, 'rgb', {
    get() { return [this.r, this.g, this.b] },
    set(...data) { this.rgba = [data, this.a] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'rgba', {
    get() { return [...this.rgb, this.a] },
    set(..._data) {
      let data = _data.flat(Infinity);
      this.r = data[0]===undefined ? this.r : data[0];
      this.g = data[1]===undefined ? this.g : data[1];
      this.b = data[2]===undefined ? this.b : data[2];
      this.a = data[3]===undefined ? this.a : data[3];
    },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'h', {
    get() { return this.hsl[0] },
    set(hue) { let b4 = this.hsla; this.hsla = [hue, b4[1], b4[2], b4[3]] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 's', {
    get() { return this.hsl[1] },
    set(saturation) { let b4 = this.hsla; this.hsla = [b4[0], saturation, b4[2], b4[3]] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'l', {
    get() { return this.hsl[2] },
    set(lightness) { let b4 = this.hsla; this.hsla = [b4[0], b4[1], lightness, b4[3]] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'hsl', {
    get() { return Elements.Colour.rgb2hsl(this.r, this.g, this.b) },
    set(..._data) {
      let data = [...Array(3)].map((e, i)=>_data[i]);
      this.hsla = [...data, this.a] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'hsla', {
    get() { return [...this.hsl, this.a] },
    set(..._data) {
      let data = _data.flat(Infinity);
      let b4 = this.hsl;
      data[0] = data[0] ? data[0] : b4[0];
      data[1] = data[1] ? data[1] : b4[1];
      data[2] = data[2] ? data[2] : b4[2];
      data = [...Elements.Colour.hsl2rgb(data[0], data[1], data[2]), data[3]];
      this.r = data[0];
      this.g = data[1];
      this.b = data[2];
      this.a = data[3]===undefined ? this.a : data[3];
    },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'c', {
    get() { return this.cmy[0] },
    set(cyan) { let b4 = this.cmya; this.cmya = [cyan, b4[1], b4[2], b4[3]] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'm', {
    get() { return this.cmy[1] },
    set(magenta) { let b4 = this.cmya; this.cmya = [b4[0], magenta, b4[2], b4[3]] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'y', {
    get() { return this.cmy[2] },
    set(yellow) { let b4 = this.cmya; this.cmya = [b4[0], b4[1], yellow, b4[3]] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'cmy', {
    get() { return [255-this.r, 255-this.g, 255-this.b] },
    set(...data) { this.cmya = [data, this.a] },
    configurable: true, enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'cmya', {
    get() { return [...this.cmy, this.a] },
    set(..._data) {
      let data = _data.flat(Infinity);
      this.r = data[0]===undefined ? this.r : 255-data[0];
      this.g = data[1]===undefined ? this.g : 255-data[1];
      this.b = data[2]===undefined ? this.b : 255-data[2];
      this.a = data[3]===undefined ? this.a : data[3];
    },
    configurable: true, enumerable: false
  });
  
  // rgb2hsl() and hsl2rgb() adapted from Kamil Kiełczewski's answer from StackOverflow
  // https://stackoverflow.com/a/64090995
  
  // h[0-360] s[0-1] l[0-1] -> r[0-255] g[0-255] b[0-255]
  Elements.Colour.hsl2rgb = function (h=0, s=1, l=0.5) {
    let a = s * Math.min(l, 1-l);
    let f = (n, k=(n+(h+360)/30)%12) => l - a * Math.max(Math.min(k-3, 9-k, 1), -1);                 
    return [255*f(0), 255*f(8), 255*f(4)]
  }
  
  // r[0-255] g[0-255] b[0-255] -> h[0-360] s[0-1] l[0-1]
  Elements.Colour.rgb2hsl = function (_r=0, _g=0, _b=0) {
    let [r, g, b] = [_r/255, _g/255, _b/255];
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b), f=(1-Math.abs(v+v-c-1)); 
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return [60*(h<0?h+6:h), f ? c/f : 0, (v+v-c)/2]
  }
  
  // c[0-255] m[0-255] y[0-255] <-> r[0-255] g[0-255] b[0-255]
  Elements.Colour.cmy2rgb = (c=0, m=0, y=0) => [ 255-c, 255-m, 255-y ];
  Elements.Colour.rgb2cmy = Elements.Colour.cmy2rgb;
  
  Elements.Colour.install = function (global) {
    global.Colour ??= Elements.Colour;
    global.Colour.rgb2hsl ??= Elements.Colour.rgb2hsl;
    global.Colour.hsl2rgb ??= Elements.Colour.hsl2rgb;
    global.Colour.rgb2cmy ??= Elements.Colour.rgb2cmy;
    global.Colour.cmy2rgb ??= Elements.Colour.cmy2rgb;
    Elements.Colour.installed = true;
  };
}

/* Limit
 *   Restricting numbers between two values
 *   Clamp is supported
 */

{
  Elements.Limit = {};
  
  Elements.Limit.clamp = (n, a, b) => {
    if (b < a) return Elements.Limit.clamp(n, b, a);
    if (n < a) return a;
    if (n > b) return b;
    return n;
  };
  Elements.Limit.wrap = (n, a, b) => {
    if (b < a) return Elements.Limit.wrap(n, b, a);
    if (n < a) return Elements.Limit.wrap(n+b-a, a, b);
    if (n > b) return Elements.Limit.wrap(n-b-a, a, b);
    return n;
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
  
  Elements.Limit.install = function (global) {
    global.Limit ??= Elements.Limit;
    global.Limit.clamp ??= Elements.Limit.clamp;
    global.Limit.wrap ??= Elements.Limit.wrap;
    global.Limit.fold ??= Elements.Limit.fold;
    Elements.Limit.installed = true;
  };
}

{
  Elements.Meal = class Meal {
    constructor(plate, { tokensOnly = false } = {}) {
      if (typeof plate != 'string') err()
      this.plate = plate;
      this.tokensOnly = tokensOnly
      this.index  = 0; // \
      this.line   = 0; // |- none of these work yet, but i'd like them to
      this.column = 0; // /
    }
    finished() { return this.plate.length == 0; }
    first(check) {
      if (this.finished()) return;
      if (typeof check == 'string') {
        return this.plate.startsWith(check);
      }
      if (typeof check == 'number') return this.plate.substring(0, check + 1);
      if (typeof check == 'undefined') return this.plate[0];
    }
    eat(edible) {
      if (typeof edible == 'string') {
        if (!this.first(edible)) return null;
        this.plate = this.plate.slice(edible.length);
        this.index += edible.length;
        const splitted = edible.split('\n');
        this.line += splitted.length - 1;
        if (splitted.length > 1) this.column = 0
        this.column += splitted[splitted.length-1].length
        return edible;
      }
      else if (typeof edible == 'function') {
        const copy = new Elements.Meal(this.plate, { tokensOnly: this.tokensOnly });
        copy.index = this.index;
        copy.line = this.line;
        copy.column = this.column;
        const out = edible(copy);
        if (out == null) return null;
        this.plate = copy.plate;
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
  Elements.Meal.map = (edible, mapper) => food => {
    const value = food.eat(edible);
    if (value == null) return null;
    if (Array.isArray(value)) return mapper(...value);
    return mapper(value);
  };
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
    let content = [], current = food.eat(edible);
    while (current != null) {
      content.push(current);
      current = food.eat(edible);
    }
    if (content.length == 0) return null;
    return food.tokensOnly ? content : content.join('');
  }
  Elements.Meal.upto = edible => food => {
    let content = '';
    while (!food.first(edible)) {
      content += food.eat(food.first());
      if (food.finished())
        if (content) return content;
        else return null;
    }
    if (content) return content;
    else return '';
  }
  Elements.Meal.maybe = edible => food => (food.eat(edible) ?? '');
  Elements.Meal.ignore = edible => food => food.eat(edible) == null ? null : '';
  Elements.Meal._ = food => food.eat(Elements.Meal.maybe(
    Elements.Meal.many(Elements.Meal.any(' ', '\t'))
  ));
  Elements.Meal.__ = food => food.eat(
    Elements.Meal.many(Elements.Meal.any(' ', '\t'))
  );
  Elements.Meal.install = function (global) {
    global.Meal        ??= Elements.Meal;
    global.Meal.any    ??= Elements.Meal.any;    // \
    global.Meal.around ??= Elements.Meal.around; // |
    global.Meal.chain  ??= Elements.Meal.chain;  // |- Fundamentals
    global.Meal.many   ??= Elements.Meal.many;   // |
    global.Meal.upto   ??= Elements.Meal.upto;   // /
    
    global.Meal.ignore ??= Elements.Meal.ignore; // \
    global.Meal.maybe  ??= Elements.Meal.maybe;  // |- Helpers
    global.Meal._      ??= Elements.Meal._;      // |
    global.Meal.__     ??= Elements.Meal.__;     // /
    Elements.Meal.installed = true;
  };
}
