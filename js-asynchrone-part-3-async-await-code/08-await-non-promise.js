// Un `await` sur autre chose qu’une promesse se comporte comme lorsqu’un
// `.then()` renvoie autre chose qu’une promesse : `Promise.resolve()`, donc
// suspension quand même et exploitation en tant que promesse accomplie lors des
// prochaines microtâches.

async function wut() {
  const text = await 'À la trois'
  console.log(text)
}

console.log('À la une')
wut()
console.log('À la deux')
