// Une séquence à étapes dépendantes (“waterfall“)
// (remarquez qu’on ne fait ici aucune gestion d'erreur…)

function showUserPage(req, res) {
  const userId = req.params.id
  User.findById(userId, (err, user) => {
    user.getPosts({ order: 'recentFirst', limit: 10 }, (err, posts) => {
      posts[0].getComments(
        { order: 'recentFirst', limit: 10 },
        (err, firstPostComments) => {
          res.render('users/profile', { user, posts, firstPostComments })
        }
      )
    })
  })
}
