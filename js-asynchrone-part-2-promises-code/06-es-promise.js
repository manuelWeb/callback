// Promesses natives en ES : le constructeur Promise

Promise.resolve()
  .then(() => new Date().toDateString())
  .then(console.log)
