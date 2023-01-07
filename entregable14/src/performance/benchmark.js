import autocannon from 'autocannon'
import { PassThrough } from 'stream'
import { config } from '../config/index.js'
import { LOGGER_UTILS } from '../utils/logger-utils.js'

function run(url) {
  const buf = []
  const outputStream = new PassThrough()

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20
  })

  autocannon.track(inst, { outputStream })

  outputStream.on('data', data => buf.push(data))
  inst.on('done', () => {
    process.stdout.write(Buffer.concat(buf))
  })
}
LOGGER_UTILS.info_log("/info","no_method",'Running all benchmarks in parallel ...')
run(`http://localhost:${config.SERVER.PORT}/info`)
