const { Limit } = Elements

console.log(Limit.sigmoid(-Infinity, 0, 1)) // 0
console.log(Limit.sigmoid(0, 0, 1))         // 0.1192...
console.log(Limit.sigmoid(0.5, 0, 1))       // 0.5
console.log(Limit.sigmoid(1, 0, 1))         //0.8807...
console.log(Limit.sigmoid(Infinity, 0, 1))  // 1



const bound = new Limit(0, 0.123)

console.log(bound.sigmoid(-Infinity))
console.log(bound.sigmoid(0))
console.log(bound.sigmoid(0.5))
console.log(bound.sigmoid(1))
console.log(bound.sigmoid(Infinity))
// should all be the same
