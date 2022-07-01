const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app').app
const { describe, it, before } = require('mocha');
const users = require('../../models/users');

chai.use(chaiHttp)

describe('Suite de testing de integracion para Users', () => {

  it('Should return 401 when user has no authorization', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .end((err, res) => {
        chai.assert.equal(res.status, 401)
        done()
      })
  })

  it('Should return 200 when user info has shown', (done) => {
    chai.request(app)
      .get('/api/v1/users/2c3ac422-9309-4dff-80ca-8824091de982')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  })

  it('Should reutn 200 when user is authorized', (done) => {
    chai.request(app)
      .get('/api/v1/users/me')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjM2FjNDIyLTkzMDktNGRmZi04MGNhLTg4MjQwOTFkZTk4MiIsImVtYWlsIjoiYWxpdmllcnpAY2FkZW1sby5jb20iLCJpYXQiOjE2NTYwOTEzMjN9.6S2TjFtcFx4pBUMdOHDWB7u87UPeaHIy4SLDG4NqDG4')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        chai.assert.typeOf(res.body, 'object')
        done()
      })
  })

  it('Should return 401 when admin has no authorization to view personal profile info', (done) => {
    chai.request(app)
      .get('/api/v1/users/me')
      .end((err, res) => {
        chai.assert.equal(res.status, 401)
        done()
      })
  })

  it('Should return 200 when users data provided', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  })

  it('Should reutn 200 when user information has edited', (done) => {
    chai.request(app)
      .put('/api/v1/users/530ef40f-1609-477e-88d9-6074df3900b6')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMGVmNDBmLTE2MDktNDc3ZS04OGQ5LTYwNzRkZjM5MDBiNiIsImVtYWlsIjoianVhbmZAYWNhZGVtbG8uY29tIiwiaWF0IjoxNjU2MDkzNzE3fQ.fIAthzSWAeXl1EpUFbEUW55Wr32kJmBL43eMuYSM6pQ')
      .send({
        "firstname": "juan",
        "lastname": "franco",
        "email": "juanf@academlo.com",
        "password": "boenas",
        "profile_image": "",
        "phone": "123456789"
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        chai.assert.typeOf(res.body, 'object')
        done()
      })
  })

  it('Should reutn 202 when user information has deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/users/1d88d376-81ba-4635-8b90-50b15af70c5b')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODhkMzc2LTgxYmEtNDYzNS04YjkwLTUwYjE1YWY3MGM1YiIsImVtYWlsIjoid2lsbWFyckBjYWRlbWxvLmNvbSIsImlhdCI6MTY1NjA5NzIzMH0.cjMwui9OILsxfuZHZmcHog7Nc5MXE39zjT1YqadrRB4')
      .end((err, res) => {
        chai.assert.equal(res.status, 202)
        done()
      })
  })

  it('Should reutn 400 when user information has no deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/users/1d88d376-81ba-4635-8b90-50b15af70c5b')
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkODhkMzc2LTgxYmEtNDYzNS04YjkwLTUwYjE1YWY3MGM1YiIsImVtYWlsIjoid2lsbWFyckBjYWRlbWxvLmNvbSIsImlhdCI6MTY1NjA5NzIzMH0.cjMwui9OILsxfuZHZmcHog7Nc5MXE39zjT1YqadrRB4')
      .end((err, res) => {
        chai.assert.equal(res.status, 400)
        done()
      })
  })
})