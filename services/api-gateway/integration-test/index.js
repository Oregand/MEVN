/* eslint-env mocha */
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

describe('API Gateway Service', () => {
  it('returns a 200 for a known albums through api-gateway', (done) => {
    const url = 'https://192.168.99.100:8080'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    api.get('/movies/premieres')
      .expect(200, done)
  })

  it('returns schedules for a album through api-gateway', (done) => {
    const url = 'https://192.168.99.101:8080'
    const api = supertest(url)
    console.log(`Calling the server ${url}`)

    api.get('/stores/588ababf2d029a6d15d0b5bf/1')
      .expect(200, done)
  })
})