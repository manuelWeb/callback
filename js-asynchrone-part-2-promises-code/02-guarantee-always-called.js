// Notre callback sera toujours appelé, même « après la bataille »

Promise.resolve()
  // La promesse est déjà accomplie au moment du `then()`, et pourtant…
  .then(() => console.log('Je suis quand même appelé'))
