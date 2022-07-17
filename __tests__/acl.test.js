'use strict';

const { users, db } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const mockRequest = supertest(server);

let testUser;

beforeAll(async () => {
  await db.sync();
  testUser = await users.create({username: 'marcusndhartwig', password: 'pass123', role: 'admin'});
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

// Persmissions to access FOOD Model
describe('Access Control Tests', () => {


  // POST /api/bravo/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item
  test('Authorized to create food item', async () => {
    let createFood = await mockRequest.post('/api/bravo/food').set('Authorization', `Bearer ${testUser.token}`).send(food1);

    expect(createFood.status).toEqual(201);
    expect(createFood.body.id).toEqual(1);
    expect(createFood.body.name).toEqual('tacos');
    expect(createFood.body.calories).toEqual(400);
    expect(createFood.body.type).toEqual('mexican');
  });

  // GET /api/bravo/:model with a bearer token that has read permissions returns a list of :model items
  test('Authorized to read all food items', async () => {
    let food = await mockRequest.get('/api/bravo/food').set('Authorization', `Bearer ${testUser.token}`);

    expect(food.status).toEqual(200);
    expect(food.body.id).toEqual(1);
    expect(food.body.name).toEqual('tacos');
    expect(food.body.calories).toEqual(400);
    expect(food.body.type).toEqual('mexican');
  });
  
  // GET /api/bravo/:model/ID with a bearer token that has read permissions returns a single item by ID
  test('Authorized to read a single food item by ID', async () => {
    let food1 = await mockRequest.get('/api/bravo/food/1').set('Authorization', `Bearer ${testUser.token}`);

    expect(food1.status).toEqual(200);
    expect(food1.body.id).toEqual(1);
    expect(food1.body.name).toEqual('tacos');
    expect(food1.body.calories).toEqual(400);
    expect(food1.body.type).toEqual('mexican');
  });
  
  // PUT /api/bravo/:model/ID with a bearer token that has update permissions returns a single, updated item by ID
  test('Authorized to update a food item by ID', async () => {
    await mockRequest.put('/food/1').send(food2).set('Authorization', `Bearer ${testUser.token}`);
    let food1 = await mockRequest.get(`/api/bravo/food/1`).set('Authorization', `Bearer ${testUser.token}`);

    expect(food1.status).toEqual(200);
    expect(food1.body.id).toEqual(1);
    expect(food1.body.name).toEqual('atole');
    expect(food1.body.calories).toEqual(200);
    expect(food1.body.type).toEqual('white stuff');
  });
  
  
  // DELETE /api/bravo/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found

  test('Authorized to delete a food item by id', async () => {
    await mockRequest.delete('/api/bravo/food/1').set('Authorization', `Bearer ${testUser.token}`);
    let getFood = await mockRequest.get(`/api/bravo/food/1`).set('Authorization', `Bearer ${testUser.token}`);

    expect(getFood.status).toEqual(200);
    expect(getFood.body).toBeNull();
  });
  
});

let clothes1 = {
  name: 'Shirt',
  color: 'Blue',
  size: 'Medium',
};

let clothes2 = {
  name: 'Jorts',
  color: 'Green',
  size: 'Large',
};

// Persmissions to access CLOTHES Model
describe('Access Control Tests', () => {


  // POST /api/bravo/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item
  test('Authorized to create a clothing item', async () => {
    let createClothes = await mockRequest.post('/api/bravo/clothes').send(clothes1).set('Authorization', `Bearer ${testUser.token}`);

    expect(createClothes.status).toEqual(201);
    expect(createClothes.body.id).toEqual(1);
    expect(createClothes.body.name).toEqual('Shirt');
    expect(createClothes.body.color).toEqual('White');
    expect(createClothes.body.size).toEqual('Medium');
  });

  // GET /api/bravo/:model with a bearer token that has read permissions returns a list of :model items
  test('Authorized to read all clothing items', async () => {
    let clothes = await mockRequest.get('/api/bravo/clothes').set('Authorization', `Bearer ${testUser.token}`);

    expect(clothes.status).toEqual(200);
    expect(clothes.body.id).toEqual(1);
    expect(clothes.body.name).toEqual('Shirt');
    expect(clothes.body.color).toEqual('Blue');
    expect(clothes.body.size).toEqual('Medium');
  });
  
  // GET /api/bravo/:model/ID with a bearer token that has read permissions returns a single item by ID
  test('Authorized to read a single clothing item by ID', async () => {
    let clothes1 = await mockRequest.get('/api/bravo/clothes/1').set('Authorization', `Bearer ${testUser.token}`);

    expect(clothes1.status).toEqual(200);
    expect(clothes1.body.id).toEqual(1);
    expect(clothes1.body.name).toEqual('Shirt');
    expect(clothes1.body.color).toEqual('Blue');
    expect(clothes1.body.size).toEqual('Medium');
  });
  
  // PUT /api/bravo/:model/ID with a bearer token that has update permissions returns a single, updated item by ID
  test('Authorized to update a single clothing itme', async () => {
    await mockRequest.put('/api/bravo/clothes/1').send(clothes2).set('Authorization', `Bearer ${testUser.token}`);
    let clothes1 = await mockRequest.get(`/api/bravo/clothes/1`).set('Authorization', `Bearer ${testUser.token}`);

    expect(clothes1.status).toEqual(200);
    expect(clothes1.body.id).toEqual(1);
    expect(clothes1.body.name).toEqual('Pants');
    expect(clothes1.body.color).toEqual('Burgandy');
    expect(clothes1.body.size).toEqual('XXLarge');
  });
  
  
  // DELETE /api/bravo/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found

  test('Authorized to delete a clothing item by ID', async () => {
    await mockRequest.delete('/api/bravo/clothes/1').set('Authorization', `Bearer ${testUser.token}`);
    let getClothes = await mockRequest.get(`/api/bravo/clothes/1`).set('Authorization', `Bearer ${testUser.token}`);

    expect(getClothes.status).toEqual(200);
    expect(getClothes.body).toBeNull();
  });
  
});