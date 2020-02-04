// Les événements utilisent des callbacks

if (typeof process !== 'undefined') {
  process.on('exit', () => console.log('Ciao !'))
}

;(function () {
  var cp = 0
  if (typeof document !== 'undefined') {
    document.addEventListener('click', () => {
      cp += 1
      console.log(`Aieuh ! ${cp}`)
    })
  }
})()
