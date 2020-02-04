// Les timers et intervalles utilisent des callbacks

const nag = setInterval(() => console.log('C’est encore loin ?'), 1000)
setTimeout(() => clearInterval(nag), 3500)
