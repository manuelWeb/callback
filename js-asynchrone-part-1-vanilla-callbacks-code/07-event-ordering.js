// La sémantique habituelle d’un émetteur d’événement est
// qu’il n'appelle pas les callbacks si l'événement a déjà eu lieu
// car rien ne dit fondamentalement qu'un événement n'a lieu qu'une
// fois et constitue une « condition ».

const { createServer } = require('http')
const server = createServer((req, res) => {
  res.end('Salut')
})
server.listen(0)
server.on('listening', reportListening)

function reportListening() {
  console.log(`En écoute sur http://localhost:${server.address().port}`)
  console.log('Ctrl+C pour arrêter')

  // Le gestionnaire suivant ne sera jamais appelé : inscrit « trop tard »…
  server.on('listening', () =>
    console.log('Après l’heure, c’est plus l’heure…')
  )
}
