const https = require('https')
const { JSDOM } = require('jsdom')
const fs = require('fs')
const fr = 'https://www.tempsl.fr/fr/'
const nl = 'https://www.ideal-praktijk.nl/nl/'

orderedParallel(
  [task(1, fr, '7466113'), task(2, fr, '1896117'), task(3, fr, '7462112'), task(1, nl, '7466113'),],
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
  const results = {}
  let remaining = tasks.length

  for (const [index, task] of tasks.entries()) {
    task((err, result, country, ref) => handleResult(index, err, result, country, ref))
  }

  function handleResult(index, err, result, country, ref) {
    console.log(`index: ${index}, country:${country}`);

    if (err) {
      callback(err)
      return
    }

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
          results[index] = {
            id: result,
            link: httpTohttps,
            lib: document.querySelector('#ctl00_ContentPlaceHolder1_LB_TITRE_PRODUIT').textContent,
            acc: document.querySelector('#ctl00_ContentPlaceHolder1_LB_SOUS_TITRE_PRODUIT').textContent,
            price: document.querySelector('#ctl00_ContentPlaceHolder1_LAB_PRIX_PRODUIT').textContent
          }
          if (--remaining === 0) {
            // callback(null, { fr: results })
            callback(null, results)
          }

        })
      })

    }).on('error', (e) => callback(e.message));

    // On les range bien à leur position définie.

  }
}

// --------------------------------------------------------------------

function task(id, country, ref) {
  // return (cb) => setTimeout(() => cb(null, id), delay)
  return (cb) => cb(null, `pk${id}`, country, ref)
}
