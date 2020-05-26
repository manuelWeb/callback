const https = require('https')
const { JSDOM } = require('jsdom')
const fs = require('fs')
const fr = 'https://www.tempsl.fr/fr/'
const nl = 'https://www.ideal-praktijk.nl/nl/'

orderedParallel(
  [task(fr, ['7466113', '1896117', '7462112']), task(nl, ['7466113'])],
  (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('RESULTS:', results)
    fs.writeFileSync('./findid.json', JSON.stringify(results, null, 2))
  }
)

// --------------------------------------------------------------------

function orderedParallel(tasks, callback) {
  const results = []
  // let remaining = tasks.length
  let remaining = 0

  for (const [index, task] of tasks.entries()) {
    console.log(`index: ${index}`);

    task((err, country, refs) => {
      remaining += refs.length
      handleResult(index, err, country, refs)
    })
  }

  function handleResult(index, err, country, refs) {
    console.log(`index: ${index}, country:${country}, refs:${refs}`);
    if (err) {
      callback(err)
      return
    }
    refs.map((ref, idx) => {
      https.get(country + 'boutique/pdtRedirect.aspx?idproduit=' + ref, res => {
        const httpTohttps = res.headers.location.replace(/^http:\/\//i, 'https://');
        let allChunk = ''

        https.get(httpTohttps, res => {
          res.setEncoding('utf8');
          res.on('data', data => {
            allChunk = allChunk + data
          })
          res.on('end', () => {
            const { document } = new JSDOM(allChunk).window;
            console.log(httpTohttps);

            // results[remaining] = {
            console.log(`country:${country}`);
            if (index === 0) {
              console.log(ref);

              results[remaining - 1] = {
                // id: idx,
                ['pk' + idx]: {
                  link: httpTohttps,
                  lib: document.querySelector('#ctl00_ContentPlaceHolder1_LB_TITRE_PRODUIT').textContent,
                  acc: document.querySelector('#ctl00_ContentPlaceHolder1_LB_SOUS_TITRE_PRODUIT').textContent,
                  price: document.querySelector('#ctl00_ContentPlaceHolder1_LAB_PRIX_PRODUIT').textContent
                }
              }
            }

            // console.log(`remaining: ${remaining}, coutry:${country}, idx:${idx}`);

            if (--remaining === 0) {
              // callback(null, { fr: results })
              callback(null, results)
            }

          })
        })

      }).on('error', (e) => callback(e.message));
    })


    // On les range bien à leur position définie.

  }
}

// --------------------------------------------------------------------

function task(index, country, refs) {
  // return (cb) => setTimeout(() => cb(null, id), delay)
  return (cb) => cb(index, null, country, refs)
}
