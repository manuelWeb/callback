// Le code ayant l’air bloquant, on revient à ses mauvaises habitudes en
// oubliant de paralléliser…

async function needlesslyLongListPosts(req, res) {
  //  Ces trois requêtes sont indépendantes les unes des autres : il est idiot
  //  de les séquencer au lieu de les paralléliser, on irait nettement plus
  //  vite !
  const results = await Post.search(req.query.filter)
  const totalCount = await Post.estimatedCount()
  const tags = await Post.tags({ top: 10 })

  res.render('posts/index', { results, totalCount, tags })
}

async function listPosts(req, res) {
  // Ici les trois promesses sont créées en amont, puis combinées pour obtenir
  // les 3 résultats au final, sans se soucier de leur ordre d'aboutissement.
  // Temps total : la plus longue des trois.
  const [results, totalCount, tags] = await Promise.all([
    Post.search(req.query.filter),
    Post.estimatedCount(),
    Post.tags({ top: 10 }),
  ])

  res.render('posts/index', { results, totalCount, tags })
}
