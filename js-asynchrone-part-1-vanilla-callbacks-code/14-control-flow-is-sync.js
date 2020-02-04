// Les instructions de contrôle de flux sont orientées synchrones…

console.log('À la une')
for (const taskDuration of [300, 500, 200, 400]) {
  // Ces appels seront exécutés après que le `for` (et toute la portée courante)
  // ont terminé leur exécution, et aboutiront dans un ordre différent : celui
  // de leurs délais d'exécution.
  setTimeout(() => console.log(`À la ${taskDuration}`), taskDuration)
}
console.log('À la deux')

// --------------------------------------------------------------------

try {
  setTimeout(() => {
    throw new Error('KABOOM')
  }, 600)
} catch (err) {
  // On n'arrivera jamais ici, l'exception sera levée dans un autre contexte
  // d'exécution.
  console.warn(err.message)
}
