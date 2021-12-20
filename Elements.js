// jshint esversion: 10
const Elements = {};

/* Main installer
 *   for istalling everything into a scope (or technically an object)
 */

{
  Elements.install = function (global) {
    if (Elements.installed) return;
    
    if (!Elements.Colour.installed) Elements.Colour.install(global);
    if (!Elements.Colour.installed) Elements.Math.install(global);
    
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
      message: `Elements.Colour() must be called with new`
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
  
  Reflect.defineProperty(Elements.Colour.prototype, 'rgb', {
    get() { return [this.r, this.g, this.b] },
    set(...data) { this.rgba = [data, this.a] },
    configurable: true,
    enumerable: false
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
    configurable: true,
    enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'hsl', {
    get() { return Elements.Colour.rgb2hsl(this.r, this.g, this.b) },
    set(..._data) {
      let data = [...Array(3)].map((e, i)=>_data[i]);
      this.hsla = [...data, this.a] },
    configurable: true,
    enumerable: false
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
    configurable: true,
    enumerable: false
  });
  
  Reflect.defineProperty(Elements.Colour.prototype, 'cmy', {
    get() { return [255-this.r, 255-this.g, 255-this.b] },
    set(...data) { this.cmya = [data, this.a] },
    configurable: true,
    enumerable: false
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
    configurable: true,
    enumerable: false
  });
  
  // rgb2hsl() and hsl2rgb() adapted from Kamil Kiełczewski's answer from StackOverflow
  // https://stackoverflow.com/a/64090995
  
  // h[0-360] s[0-1] l[0-1] -> r[0-255] g[0-255] b[0-255]
  Elements.Colour.hsl2rgb = function (h=0, s=1, l=0.5) {
    let a = s * Math.min(l, 1-l);
    let f = (n, k=(n+(h+360)/30)%12) => l - a * Math.max(Math.min(k-3, 9-k, 1), -1);                 
    return [Math.floor(255*f(0)), Math.floor(255*f(8)), Math.floor(255*f(4))]
  }
  
  // r[0-255] g[0-255] b[0-255] -> h[0-360] s[0-1] l[0-1]
  Elements.Colour.rgb2hsl = function (_r=0, _g=0, _b=0) {
    let [r, g, b] = [_r/255, _g/255, _b/255];
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b), f=(1-Math.abs(v+v-c-1)); 
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return [60*(h<0?h+6:h), f ? c/f : 0, (v+v-c)/2]
  }
  
  // c[0-255] m[0-255] y[0-255] -> r[0-255] g[0-255] b[0-255]
  Elements.Colour.cmy2rgb = (c=0, m=0, y=0) => [
    Elements.Math.clamp(255-c, 0, 255),
    Elements.Math.clamp(255-m, 0, 255),
    Elements.Math.clamp(255-y, 0, 255)
  ];
  
  // r[0-255] g[0-255] b[0-255] -> c[0-255] m[0-255] y[0-255]
  Elements.Colour.rgb2cmy = Elements.Colour.cmy2rgb;
  
  Elements.Colour.install = function (global) {
    global.Colour = Elements.Colour;
    Elements.Colour.installed = true;
  };
}

/* Math
 *   Restricting numbers between two values
 *   Clamp is supported
 */

{
  Elements.Math = {};
  
  Elements.Math.clamp = (n, a, b) => Math.min(Math.max(a, n), b);
  
  Elements.Math.install = function (global) {
    global.Math.clamp = Elements.Math.clamp;
    Elements.Math.installed = true;
  };
}
