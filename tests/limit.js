Elements.install(this)

console.log(Limit.sigmoid(-Infinity, 0, 1)) // 0
console.log(Limit.sigmoid(0, 0, 1))         // 0.11920...
console.log(Limit.sigmoid(0.5, 0, 1))       // 0.5
console.log(Limit.sigmoid(1, 0, 1))         // 0.88079...
console.log(Limit.sigmoid(Infinity, 0, 1))  // 1

