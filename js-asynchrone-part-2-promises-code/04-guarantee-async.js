// L’établissement est garanti asynchrone

new Promise((resolve, reject) => {
  // On appelle ici `resolve()` de façon synchrone, directement.
  resolve(42)
}).then(console.log)
// Ce log aura toutefois lieu avant, l’établissement de la promesse étant
// garanti asynchrone.
console.log('Mais d’abord…')
