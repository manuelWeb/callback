const https = require('https')
const { JSDOM } = require('jsdom')
const fs = require('fs')

const descriptor = {
  fr: 'https://www.tempsl.fr/fr/',
  nl: 'https://www.ideal-praktijk.nl/nl/'
}

orderedParallel(
  [task('fr', ['7466113', '1896117', '7462112']), task('nl', ['7466113'])],
  (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    const spread = { fr: { ...results[0].fr }, nl: { ...results[1].nl } }
    console.log('RESULTS:', spread)
    fs.writeFileSync('./findid.json', JSON.stringify(results, null, 2))
  }
)

// --------------------------------------------------------------------

function orderedParallel(tasks, callback) {
  const results = []
  let remaining = tasks.length
  // let remaining

  for (const [index, task] of tasks.entries()) {
    // console.log(`index: ${index}`);
    task((err, country, refs) => {
      handleResult(index, err, country, refs)
    })
  }

  function handleResult(index, err, country, refs) {
    // console.log(`index: ${index}, country:${country}, refs:${refs}`);
    if (err) {
      callback(err)
      return
    }
    // init obj with country
    results[index] = { [country]: {} }
    let refCount = refs.length
    let storeRef = []

    // console.log('refs.length: %d, coutry: %s, index: %d', refs.length, country, index);
    // console.log(results[index][country]);


    refs.map((ref, idx) => {
      // storeRef[idx] = ref

      https.get(descriptor[country] + 'boutique/pdtRedirect.aspx?idproduit=' + ref, res => {
        const httpTohttps = res.headers.location.replace(/^http:\/\//i, 'https://');
        let allChunk = ''

        https.get(httpTohttps, res => {
          res.setEncoding('utf8');
          res.on('data', data => {
            allChunk = allChunk + data
          })
          res.on('end', () => {
            const { document } = new JSDOM(allChunk).window;

            storeRef[idx] = {
              id: idx,
              // ['pk' + idx]: {
              link: httpTohttps,
              lib: document.querySelector('#ctl00_ContentPlaceHolder1_LB_TITRE_PRODUIT').textContent,
              acc: document.querySelector('#ctl00_ContentPlaceHolder1_LB_SOUS_TITRE_PRODUIT').textContent,
              price: document.querySelector('#ctl00_ContentPlaceHolder1_LAB_PRIX_PRODUIT').textContent
              // }
            }
            if (--refCount === 0) {
              // results[index][country] = { refCount: refs }
              results[index][country] = storeRef
              writeNested(storeRef)
              // console.log(results[index][country]);
            }
          })
        })

      }).on('error', (e) => callback(e.message));
    })
    // On les range bien à leur position définie.
    function writeNested(obj) {
      if (--remaining === 0) {
        results[index][country] = obj
        callback(null, results)
      }
    }

  }
}

// --------------------------------------------------------------------

function task(country, refs) {
  // return (cb) => setTimeout(() => cb(null, id), delay)
  return (cb) => cb(null, country, refs)
}
