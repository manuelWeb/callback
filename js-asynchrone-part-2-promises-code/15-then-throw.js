// Quand un callback passé à `.then` lève une exception, celle-ci est convertie
// en promesse rejetée avec l’objet erreur, et faute d’être traitée dans la
// suite de la chaîne, sera signalée au global comme rejet non-traité. Dans
// Node, ignorer cette situation constitue un comportement déprécié (code de
// dépréciation DEP0018) et aboutira prochainement à l’arrêt pur et simple du
// moteur, comme un événement `'error'` non-traité.

Promise.resolve().then(() => {
  throw new Error('KABOOM')
})
