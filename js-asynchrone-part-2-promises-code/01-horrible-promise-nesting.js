// J’ai rien compris aux promesses : démonstration par l’exemple.

fetch('https://jsonplaceholder.typicode.com/posts?userId=1').then((res) => {
  res.json().then((posts) => {
    fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`
    ).then((res) => {
      res.json().then((comments) => {
        console.log(`Article : ${posts[0].title}`)
        console.log(`Premier commentaire par : ${comments[0].name}`)
      })
    })
  })
})
