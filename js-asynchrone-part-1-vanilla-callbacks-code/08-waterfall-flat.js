// Une séquence à étapes dépendantes (“waterfall“)
// (remarquez qu’on ne fait ici aucune gestion d'erreur…)
const fetch = require('node-fetch')
const { URLSearchParams, URL } = require('url');
const mock = 'https://jsonplaceholder.typicode.com';
const id = process.argv[2]

function showUserPage(req, res) {
  // const userId = req.params.id
  const userId = req.id
  const user = `${mock}/users?id=${userId}`
  console.log(user);

  getUserPosts(user, (err) => console.log(err.message))

  function getUserPosts() {
    const params = new URL(user)
    const posts = `${mock}/users/${params.searchParams.get('id')}/posts`
    // fetch(posts)
    //   .then(resp => resp.json())
    //   .then((posts, err) => displayPosts(posts, err))
    fetchData(posts, displayPosts)
  }
  function displayPosts(posts, err) {
    // posts.map(post => console.log(`post title n°${post.id}: ${post.title}`))
    getPostsComments(posts)
  }
  function getPostsComments(posts, cb) {
    // console.log(posts);
    posts.map(post => {
      console.log(`${mock}/posts/${post.id}/comments`);
    })
  }
  // User.findById(userId, (err, user) => {
  //   user.getPosts({ order: 'recentFirst', limit: 10 }, (err, posts) => {
  //     posts[0].getComments(
  //       { order: 'recentFirst', limit: 10 },
  //       (err, firstPostComments) => {
  //         res.render('users/profile', { user, posts, firstPostComments })
  //       }
  //     )
  //   })
  // })
}

showUserPage({ id: id })

function fetchData(data, cb) {
  fetch(data)
    .then(resp => resp.json())
    .then((data, err) => cb(data, err))
}