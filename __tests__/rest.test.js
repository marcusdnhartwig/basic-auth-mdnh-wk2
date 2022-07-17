'use strict';

const supertest = require('supertest');
const { db } = require('../src/models');
const { server } = require('../src/server');
const { sequelize } = require('../src/models');
const mockRequest = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

let food1 = {
  name: 'tacos',
  calories: 400,
  type: 'mexican',
};

let food2 = {
  name: 'black stuff',
  calories: 10,
  type: 'coffee',
};

describe('Testing REST API', () => {

  test('Add an item to the DB', async () => {
    let response = await mockRequest.post('/api/alpha/food').send(food1);

    expect(response.status).toEqual(201);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Apple');
    expect(response.body.calories).toEqual(95);
    expect(response.body.type).toEqual('fruit');
  });

  test('Return all food items from the DB', async () => {
    let response = await mockRequest.get('/api/alpha/food');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('tacos');
    expect(response.body.calories).toEqual(400);
    expect(response.body.type).toEqual('mexican');
  });

  test('Returns a specific food item from the DB', async () => {
    let response = await mockRequest.get('/api/alpha/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('tacos');
    expect(response.body.calories).toEqual(400);
    expect(response.body.type).toEqual('mexican');
  });

  test('Returns a specific UPDATED food item from the DB', async () => {
    await mockRequest.put('/api/alpha/food/1').send(food2);
    let getFood = await mockRequest.get('/api/alpha/food/1');

    expect(getFood.status).toEqual(200);
    expect(getFood.body.id).toEqual(1);
    expect(getFood.body.name).toEqual('black stuff');
    expect(getFood.body.calories).toEqual(10);
    expect(getFood.body.type).toEqual('coffee');
  });

  test('DELETE a specific food item from the DB', async () => {
    await mockRequest.delete('/api/alpha/food/1');
    let getFood = await mockRequest.get('/api/alpha/food/1');

    expect(getFood.status).toEqual(200);
    expect(getFood.body).toBeNull();
  });

});

let clothes1 = {
  name: 'Shirt',
  color: 'White',
  size: 'Medium',
};

let clothes2 = {
  name: 'Jorts',
  color: 'White',
  size: 'Small',
};

describe('Testing REST API', () => {

  test('Add clothes to the DB', async () => {
    let response = await mockRequest.post('/api/alpha/clothes').send(clothes1);

    expect(response.status).toEqual(201);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  // GET /api/v1/:model returns a list of :model items
  test('Return all clothes from the DB', async () => {
    let response = await mockRequest.get('/api/alpha/clothes');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  test('Returns a specific clothing item from the DB', async () => {
    let response = await mockRequest.get('/api/alpha/clothes/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Shirt');
    expect(response.body.color).toEqual('White');
    expect(response.body.size).toEqual('Medium');
  });

  test('Returns a specific UPDATED clothing item from the DB', async () => {
    await mockRequest.put('/api/v1/clothes/1').send(clothes2);
    let getClothes = await mockRequest.get(`/api/alpha/clothes/1`);

    expect(getClothes.status).toEqual(200);
    expect(getClothes.body.id).toEqual(1);
    expect(getClothes.body.name).toEqual('Jorts');
    expect(getClothes.body.color).toEqual('White');
    expect(getClothes.body.size).toEqual('Small');
  });

  test('DELETE a specific clothing item from the DB', async () => {
    await mockRequest.delete('/api/alpha/clothes/1');
    let getClothes = await mockRequest.get(`/api/alpha/clothes/1`);

    expect(getClothes.status).toEqual(200);
    expect(getClothes.body).toBeNull();
  });
  
});