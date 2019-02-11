#!/usr/bin/env node

const connect = require('connect')
const morgan = require('morgan')
const serve = require('serve-static')

connect()
  .use(morgan(json))
  .use(serve(process.env.npm_package_config_static_root, { index: ['index.html'] }))
  .listen(process.env.npm_package_config_virtual_port, function ({ stringify } = JSON) {
    console.info(stringify(this.address()))
  })

function json (tokens, req, res, { stringify } = JSON) {
  return stringify({
    'remote-address': tokens['remote-addr'](req, res),
    'time': tokens['date'](req, res, 'iso'),
    'method': tokens['method'](req, res),
    'url': tokens['url'](req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens['status'](req, res),
    'content-length': tokens['res'](req, res, 'content-length'),
    'referrer': tokens['referrer'](req, res),
    'user-agent': tokens['user-agent'](req, res)
  })
}
