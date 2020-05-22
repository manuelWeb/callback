// // Regrouper des callbacks disparates n’est pas chose aisée…

// misorderedParallel(
//   [task(1, 100), task(2, 300), task(3, 200)],
//   (err, results) => {
//     // On va en fait avoir [1, 3, 2] (ordre de complétion, pas de définition).
//     console.log('RESULTS:', results)
//   }
// )

// // --------------------------------------------------------------------

// function misorderedParallel(tasks, callback) {
//   const results = []
//   for (const task of tasks) {
//     task(handleResult)
//   }

//   function handleResult(err, result) {
//     if (err) {
//       // C'est bien de propager, mais on ne s'arrête pas à la première erreur,
//       // on les propagera toutes, ce qui n'est pas forcément souhaitable.
//       callback(err)
//       return
//     }

//     // Oui, mais du coup on les range dans leur ordre de complétion, pas dans
//     // leur ordre initialement défini, ce qui n’est pas cool…
//     results.push(result)
//     if (results.length === tasks.length) {
//       callback(null, results)
//     }
//   }
// }

// --------------------------------------------------------------------

orderedParallel(
  [task(1, 100), task(2, 300), task(3, 200)],
  (err, results) => {
    // On aura bien [1, 2, 3], toujours au bout de ~300ms.
    console.log('RESULTS:', results)
  }
)

// --------------------------------------------------------------------

function orderedParallel(tasks, callback) {
  const results = []
  let remaining = tasks.length
  let remaining_ = tasks.length
  // console.log([...tasks.entries()].map(i => i))

  for (const [index, task] of tasks.entries()) {
    task((err, result) => handleResult(index, err, result))
  }

  function handleResult(index, err, result) {
    console.log(`result: ${result}, --remaining: ${--remaining_}, results: ${results}, index: ${index}`);

    if (err) {
      callback(err)
      return
    }

    // On les range bien à leur position définie.
    results[index] = result
    if (--remaining === 0) {
      callback(null, results)
    }
  }
}

// --------------------------------------------------------------------

function task(id, delay) {
  // return (cb) => setTimeout(() => cb(null, id), delay)
  return (cb) => setTimeout(
    () => cb(null, `task number: ${id}`)
    , delay)
}
