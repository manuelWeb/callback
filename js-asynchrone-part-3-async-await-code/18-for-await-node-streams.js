// Les flux en lecture (`Readable`) dans Node.js 10+ sont des itérables
// asynchrones, et peuvent donc aussi être consommés par un `for await…of`.

demo()

async function demo() {
  process.stdin.setEncoding('utf-8')
  console.clear()
  console.log('Tapez des trucs et validez. Ctrl+C / Ctrl+D pour arrêter.')
  for await (const line of process.stdin) {
    console.log('>', line)
  }
}
