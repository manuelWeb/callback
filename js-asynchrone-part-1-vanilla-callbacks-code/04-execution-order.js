// Ordre d’exécution et Run-To-Completion

console.log('À la une')
setTimeout(() => console.log('À la trois'), 0)
console.log('À la deux')
