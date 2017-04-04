'use strict'
import mongoose from 'mongoose'

export default class Database {

  constructor (env) {
    mongoose.Promise = global.Promise
    return env === 'production' ? this.production(): this.local();
  }

  production () {
    let connection
    return connection = mongoose.connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('Database connected successfully')
      }).catch((err) => {
        console.error(err)
      })
  }

  local () {
    let connection
    const localURI = 'mongodb://localhost:27017/viniciusKleber-js'
    
    return connection = mongoose.connect(localURI)
      .then(() => {
        return true
      }).catch((err) => {
        console.error(err)
      })
  }

}