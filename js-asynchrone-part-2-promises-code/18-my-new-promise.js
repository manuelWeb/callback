// On crée une promesse avec le constructeur Promise

console.time('Accomplissement')

const promise = function (params) {
  return new Promise((resolve, reject) => {
    // Cette fonction de rappel contient le traitement asynchrone, ou au moins son
    // déclenchement.  Ici, on s’accomplira avec la valeur 42 après 300ms.
    setTimeout(() => resolve(params), 1000)
  })
}

let count = 0;
promise(42).then((result) => {
  console.log('Valeur d’accomplissement :', result);
  console.log(`then1 count:${count}`);
  console.timeEnd('Accomplissement')
  console.time('Accomplissement')
  // if (count <= 3) { promise(84); return }
  return count <= 3 ? promise(84) : result
}).then(res => {
  count++;
  if (count <= 3) promise().reject(12)
  console.log('Seconde valeur d’accomplissement :', res);
  console.log(`then2 count:${count}`);
  console.timeEnd('Accomplissement')
}).catch(err => console.log(err.message))
  .finally(() => console.log(count))
