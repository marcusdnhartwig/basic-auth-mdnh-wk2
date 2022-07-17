'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');

const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js');


authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

// RBAC ROUTES
authRouter.get('/read', bearerAuth, permissions('read'), (req, res, next) => {
  res.status(200).send('Success! I have read permissions!');
});

authRouter.get('/create', bearerAuth, permissions('create'), (req, res, next) => {
  res.status(200).send('Success! I have create permissions!');
});

authRouter.get('/update', bearerAuth, permissions('update'), (req, res, next) => {
  res.status(200).send('Success! I have update permissions!');
});

authRouter.get('/delete', bearerAuth, permissions('delete'), (req, res, next) => {
  res.status(200).send('Success! I have delete permissions!');
});

module.exports = authRouter;