'use strict'
import mongoose from 'mongoose'
/**
 * Restrictions
 */

const nameRestriction = {
  type: String,
  required: [true, 'No name given'],
  minlength: [3, 'Name too short'],
  maxlength: [100, 'Name too big'],
}

const emailRestriction = {
  type: String,
  required: [true, 'No email given'],
  index: [{unique: true}, 'Duplicate '],
}

// todo: make login unique
const loginRestriction = {
  type: String,
  required: [true, 'No login given'],
  index: { unique: true },
}

const passwordRestriction = {
  type: String,
  required: [true, 'No password given'],
}

/**
 * Student Schema
 */

const userSchema = new mongoose.Schema({
  first_name: nameRestriction,
  last_name: nameRestriction,
  email: emailRestriction,
  login: loginRestriction,
  password: passwordRestriction,
})

export default mongoose.model('User', userSchema)