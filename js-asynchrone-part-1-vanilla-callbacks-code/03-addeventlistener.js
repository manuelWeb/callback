// Les événements utilisent des callbacks

if (typeof process !== 'undefined') {
  process.on('exit', () => console.log('Ciao !'))
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', () => console.log('Aieuh !'))
}
