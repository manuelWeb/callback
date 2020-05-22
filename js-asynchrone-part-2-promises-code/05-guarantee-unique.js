// La transition est garantie unique, donc l’appel à notre callback aussi.

new Promise((resolve, reject) => {
  resolve(42)
  // Ces établissements supplémentaires seront ignorés, la promesse
  // ayant déjà transitionné.
  resolve(43)
  resolve(44)
}).then(console.log)
// Un seul log, de 42
