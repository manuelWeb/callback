// Une séquence à étapes dépendantes (“waterfall“)
// remise un peu à plat en déclarant des fonctions nommées
// pour chaque étape.
//
// (remarquez qu’on ne fait ici aucune gestion d'erreur…)

function showUserPage(req, res) {
  const userId = req.params.id
  let user, posts

  User.findById(userId, getUserPosts)

  function getUserPosts(err, u) {
    user = u
    user.getPosts({ order: 'recentFirst', limit: 10 }, getComments)
  }

  function getComments(err, ps) {
    posts = ps
    posts[0].getComments({ order: 'recentFirst', limit: 10 }, renderUserProfile)
  }

  function renderUserProfile(err, firstPostComments) {
    res.render('users/profile', { user, posts, firstPostComments })
  }
}
