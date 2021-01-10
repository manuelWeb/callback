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
      size: size,
      fullpath: fullpath[x],
      isDir: stats[x].isDirectory(),
      last_modif: ctime.toLocaleString(),
      last_modif_: ctime.toLocaleTimeString("en-US", { hour12: false }),
      last_modif_2: ctime.toLocaleDateString().replace(/\//g, '-'),
      last_modif_2: ctime.toISOString()
    })
    )
      .map(i => {
        const { isDir } = i
        const imDir = ({ isDir, name, size, ...rest }) => ({ dir: name, ...rest })
        const imFile = ({ isDir, name, ...rest }) => ({ file: name, ...rest })
        return isDir ? imDir(i) : imFile(i)
      })
    // .filter(i => !i.isDir)
    return arrayfiles
  })
  .then(console.log)
  .catch(err => console.log(err.message))
  // .then(({ size }) => console.log(`Le premier fichier fait ${size} octets`))
