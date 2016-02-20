'use strict'

const path = require('path')
const fs = require('fs')
const merge = require('lodash.merge')

module.exports = class FileSystemStorage {
  constructor (options) {
    this.options = merge({
      directory: false
    }, options)

    if (!this.options.directory) {
      throw new Error('Missing options.directory')
    }
  }

  init () {
    return new Promise((res, rej) => {
      fs.mkdir(this.options.directory, err => {
        res()
      })
    })
  }

  get (key) {
    return new Promise((res, rej) => {
      fs.readFile(path.join(this.options.directory, key), (err, buffer) => {
        if (err) {
          if (err.code === 'ENOENT') {
            return res(null)
          } else {
            return rej(err)
          }
        }
        res(buffer)
      })
    })
  }

  put (key, buffer) {
    return new Promise((res, rej) => {
      fs.writeFile(path.join(this.options.directory, key), buffer, err => {
        if (err) {
          return rej(err)
        } else {
          return res()
        }
      })
    })
  }

  _destroy () {
    let spawn = require('child_process').spawnSync
    spawn('rm', ['-R', this.options.directory])
  }
}
