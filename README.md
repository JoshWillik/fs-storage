# Librarian FileSystem Storage

**Note**: This version of `librarian-fs-storage` is compatible with `librarian` 2.0.0 and above.

## Installation

```
$ npm install librarian-fs-storage
```

## Usage

```js
var express = require('express')
var librarian = require('librarian')
var FileSystemStorage = require('librarian-fs-storage')
var storage = new FileSystemStorage({
  directory: '/files'
})

var app = express()
app.use('/files', librarian({
    storage: storage
}))

app.listen(8888, function(){
    console.log('app listening')
})
```

## Options

### directory (required)

This is the directory that your files will be written to
