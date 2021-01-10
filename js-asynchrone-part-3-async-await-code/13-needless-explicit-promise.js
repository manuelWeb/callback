// Une fonction `async` renvoie implicitement une promesse : inutile d’en créer
// une explicitement, du coup…

doubleTake(42).then(console.log)

async function doubleTake(result) {
  return new Promise((resolve) => resolve(result))
  // Ou plus court : return Promise.resolve(result)…

  // …mais un simple `return result` suffirait !
}
