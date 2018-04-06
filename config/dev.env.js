'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
Object.assign = require('object.assign')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
