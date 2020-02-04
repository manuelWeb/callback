function waitAndTick(delay, cb, cycles) {
  let count = 1
  const tick = setInterval(() => {
    cb(new Date().toLocaleTimeString(), count)
    cycles <= count && clearInterval(tick)
    count++
  }, delay)

}

waitAndTick(1000, (now, cpt) => console.log(`il est ${now}, count: ${cpt}`), 3)