// Exceptions asynchrones

try {
  console.log('À la une')
  setTimeout(() => {
    throw new Error('KABOOM')
  }, 0)
  console.log('À la deux')
} catch (e) {
  // On n’entrera jamais ici…
  console.log('Exception capturée :', e)
}

if (typeof process !== 'undefined') {
  process.on('uncaughtException', (e) => {
    // On pourrait éventuellement récupérer l’exception ici (avec Node)
    console.log('Exception capturée au niveau racine :', e.message)
  })
}
