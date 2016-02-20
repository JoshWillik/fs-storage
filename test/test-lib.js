'use strict'

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const FileSystemStorage = require('../')

const TEST_KEY = 'test-key'
const FAKE_KEY = 'fake-key'
const TEST_DATA = fs.readFileSync(__dirname + '/test_upload_image.jpg')
const TEST_TIMEOUT = 10000

describe('FileSystemStorage', () => {
  describe('bad configuration', () => {
    it('should throw without options.directory', () => {
      assert.throws(() => new FileSystemStorage)
    })
  })

  describe('good configuration', () => {
    let plugin = new FileSystemStorage({
      directory: path.join(process.env.PWD, 'test-dir')
    })

    after( function () {
      this.timeout(TEST_TIMEOUT)
      // This is not a public API, I just use this to destroy the bucket when I'm done testing.
      return plugin._destroy()
    })

    it('should init()', function () {
      this.timeout(TEST_TIMEOUT)
      return plugin.init()
    })

    it('should put()', function () {
      this.timeout(TEST_TIMEOUT)
      return plugin.put(TEST_KEY, TEST_DATA)
    })

    it('should get()', function () {
      this.timeout(TEST_TIMEOUT)

      return plugin.get(TEST_KEY).then(fetched => {
        if (TEST_DATA.compare(fetched) !== 0) {
          throw new Error('Data is not the same when fetched')
        }
      })
    })

    it('should return null for a get() of a missing key', function () {
      this.timeout(TEST_TIMEOUT)

      return plugin.get(FAKE_KEY).then(data => {
        assert.equal(data, null)
      })
    })
  })
})
