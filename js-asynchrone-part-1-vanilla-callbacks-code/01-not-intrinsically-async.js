// Un callback n’est pas *forcément* asynchrone…

function callItNow (callback) {
  callback('À la deux')
}

console.log('À la une')
callItNow(message => console.log(message))
console.log('À la trois')
