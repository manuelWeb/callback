const request = require('request')

const pdtRedirect = 'boutique/pdtRedirect.aspx'

const host = 'http://www.latelierdelucie.fr/fr/'
const ref = ['0449496', '2413193', '0444497']


function getUrl(url) {

  url = url.map(i => `${host}${pdtRedirect}?idproduit=${i}`)
  // console.log(url);


  // request(i, (err, resp) => console.log(resp.request.uri.href) )
  url.map(
    i => {
      // return new Promise(function (resolve,reject) {
      //   // request(i, function (error,response) {
      //   //   if(error) return reject(error)
      //   //   resolve(response.request.uri.href)
      //   //   // try{
      //   //   // } catch(e) {reject(e)}
      //   // })
      // })
      // resolve(i)
      request(i, function (error, response) {
        // console.log(response.request.uri.href);
        // eslint-disable-next-line no-unused-vars
        const { href, port, host: url, ...rest } = response.request.uri
        // console.log(response.request.uri);
        console.log(`href: ${href}, url: ${url}`);
      })
    }
  )
}
getUrl(ref)

// const fullUrl = getUrl(ref).then(
//   val => {
//     console.log(val);
//   }
// )






