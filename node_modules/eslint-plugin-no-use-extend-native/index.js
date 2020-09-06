/* eslint no-var: 0 */
'use strict'
var rule = require('./rules/no-use-extend-native')

module.exports = {
  rules: {
    'no-use-extend-native': rule
  },
  configs: {
    recommended: {
      plugins: ['no-use-extend-native'],
      rules: {
        'no-use-extend-native/no-use-extend-native': 2
      }
    }
  }
}
