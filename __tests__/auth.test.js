'use strict';

const { server } = require('../src/server.js');
const { db } = require('../src/models');
const mockRequest = supertest(server);
const supertest = require('supertest');
const base64 = require('base-64');

beforeAll (async () => {
  await db.sync();
});
afterAll (async () => {
  await db.drop();
});

describe('Auth Tests', () => {
  test('User signs up with POST /signup', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'marcusdnhartwig',
      password: 'pass123',
    });
    console.log('Response Body', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('marcusndhartwig');
    expect(response.body.user.password).toBeTruthy();
    expect(response.body.user.password).not.toEqual('pass123');
  });
  test ('allows user to signin to account with a POST to /signin', async () => {
    let authStr = 'marcusdnhartwig:pass123';
    let encodedStr = base64.encode(authStr);
    let response = await mockRequest.post('/signin').set('Authorization', `Basic ${encodedStr}`);
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('marcusdnhartwig');
  });
});