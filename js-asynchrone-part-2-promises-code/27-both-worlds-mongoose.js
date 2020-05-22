// L'API Mongoose, notamment les Queries, sont exploitables comme des promesses
// (ce sont des *thenables*) ou avec une fonction de rappel, indifféremment.

function promiseTunes({ page = 1, sorting = '-createdAt' } = {}) {
  return Tune.find()
    .sort(sorting)
    .limit(10)
    .skip((page - 1) * 10)
}

// --------------------------------------------------------------------

function searchTunes({ page = 1, sorting = '-createdAt' }, callback) {
  Tune.find()
    .sort(sorting)
    .limit(10)
    .skip((page - 1) * 10)
    .exec(callback)
}
