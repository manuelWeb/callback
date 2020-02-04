const source = process.stdin

source.setEncoding('utf-8')
source.on('readable', () => {
  const text = source.read()
  setImmediate(() => {
    process.nextTick(() => {
      console.log(text)
    })
  })
})
