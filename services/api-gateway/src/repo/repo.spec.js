/* eslint-env mocha */
const should = require('should')
const repository = require('./repo')

describe('Repository', () => {
  it('should connect with a promise', () => {
    repository.connect({}).should.be.a.Promise()
  })
})