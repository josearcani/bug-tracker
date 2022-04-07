import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

import db from './db/models';

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  })
})


app.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll();
    console.log(users);
    res.json({users})
  } catch (error) {
    console.log(error);
  }
})