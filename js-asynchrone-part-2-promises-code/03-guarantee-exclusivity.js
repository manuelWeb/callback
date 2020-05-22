// Seul un des callbacks sera appelé (le premier sollicité)

new Promise((resolve, reject) => {
  resolve(42)
  // La promesse est déjà établie (accomplie, en l’occurrence), du coup ce
  // `reject()` sera tout simplement ignoré, et le callback de rejet ne sera
  // donc jamais appelé.
  reject(new Error('KABOOM'))
}).then(console.log, console.warn)
// Seul un log de 42 aura lieu
