// Mettre des callbacks en concurrence est verbeux…

race([task(1, 200), task(2, 300), task(3, 100)], showResults)
race([task(1, 200), task(2, 300), task('KABOOM', 100)], showResults)

// --------------------------------------------------------------------

function race(tasks, callback) {
  let called = false
  for (const task of tasks) {
    task(handleResult)
  }

  function handleResult(err, data) {
    if (called) {
      return
    }
    called = true
    callback(err, data)
  }
}

// --------------------------------------------------------------------

function showResults(err, results) {
  if (err) {
    console.warn(err)
  } else {
    console.log(results)
  }
}

function task(idOrErrMessage, delay) {
  return (cb) =>
    setTimeout(() => {
      if (typeof idOrErrMessage === 'number') {
        cb(null, idOrErrMessage)
      } else {
        cb(new Error(idOrErrMessage))
      }
    }, delay)
}
