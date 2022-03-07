### Limit
#### Clamp
```js
Elements.Limit.clamp(number, low, high)
Limit.clamp(number, low, high)
```
![Clamp Graph](https://user-images.githubusercontent.com/25611707/147256564-1a441c7c-f117-444c-8496-1e7134d06e01.png)

The `clamp()` function returns the number but restricted between `low` and `high`

#### Wrap
```js
Elements.Limit.wrap(number, low, high)
Limit.wrap(number, low, high)
```
![Wrap Graph](https://user-images.githubusercontent.com/25611707/147256614-a646cdac-544b-469d-a030-acd28c7fa96c.png)

The `wrap()` function is a modified version of the modulo (%) operator - but with one key difference:
```js
-1 % 10 // gives -1
Limit.wrap(-1, 0, 10) // gives 9 - properly between 0 and 10
```
I'm thinking of doing an alternate version that swaps the upper and lower bounds, something like:
```js
Limit.wrap(0, 0, 10) // gives 0, but
Limit.awrap(0, 0, 10) // would give 10
```

#### Fold
```js
Elements.Limit.fold(number, low, high)
Limit.fold(number, low, high)
```
![Fold Graph](https://user-images.githubusercontent.com/25611707/147256972-7b3cb09e-e083-4a75-a6f5-5f8190917b4b.png)

The `fold()` function is like `wrap()`, but is more continuous, and actually probably the least useful

#### Sigmoid
```js
Elements.Limit.sigmoid(number, low, high)
Limit.sigmoid(number, low, high)
```
![Sigmoid Graph](https://user-images.githubusercontent.com/25611707/147257188-8cc356ce-ab7a-4782-a435-cec61dda8e8a.png)

The `sigmoid()` function is a modified version of a relatively well known mathematical function, widely used as an activator function in the field of AI, I haven't actually used it yet, but I thought it'd be a bit cool to play around with it in a future project
