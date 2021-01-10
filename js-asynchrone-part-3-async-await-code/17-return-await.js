// `return await` n’a du sens que dans un try-catch

async function dumbFetcher(email, password) {
  password = await bcrypt.hash(password, 10)
  // Aucun intérêt, puisqu’on est de toutes façons une promesse pour le résultat
  // et qu’on ne souhaite pas altérer l’établissement, alors autant renvoyer la
  // promesse sous-jacente…
  return await userInfo.findOne().where({ email, password })
}

async function fetcher(email, password) {
  password = await bcrypt.hash(password, 10)
  return userInfo.findOne().where({ email, password })
}

async function shieldedFetcher(email, password) {
  password = await bcrypt.hash(password, 10)
  try {
    return await userInfo.findOne().where({ email, password })
  } catch (err) {
    // Puisqu’on veut capturer un éventuel rejet pour le transformer en
    // accomplissement de valeur `null`, à moins de faire manuellement un
    // `.catch()` sur la promesse renvoyée par simple `return`, il nous faut un
    // `return await` pour que le rejet soit retranscrit comme un `throw` local.
    console.warn('User fetching error:', err)
    return null
  }
}
