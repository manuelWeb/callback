const { join: joinPaths, resolve } = require('path')
const { readdir, stat } = require('fs').promises

const path = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : process.cwd()
let fullpath = []
let arraynames

readdir(path)
  .then((names) => {
    arraynames = names
    fullpath = names.map(name => joinPaths(path, name))
    const stats = names.map(name => stat(joinPaths(path, name)))
    return Promise.all(stats)
  })
  .then(stats => {
    const arrayfiles = stats.map(({ ctime, size }, x) => ({
      name: arraynames[x],
      fullpath: fullpath[x],
      last_modif: ctime.toLocaleString(),
      size: size,
      isDir: stats[x].isDirectory()
    })
    )
      .filter(i => {
        const imDir = ({ isDir, name, ...rest }) => ({ dirname: name, ...rest })
        i.isDir ? console.log(imDir(i)) : console.log(i);
        // return i.isDir ? imDir(i) : i
        // i.isDir && console.log({ i, dir: i.name })
      })
    // .filter(i => i.isDir && { ...i, i: 'i.name' })
    // .filter(i => !i.isDir)
    // return arrayfiles
  })
  // .then(console.log)
  .catch(err => console.log(err.message))
  // .then(({ size }) => console.log(`Le premier fichier fait ${size} octets`))
