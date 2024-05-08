import express from "express";
import db from '../db/connection.js';
import { ObjectId } from "mongodb";

const router = express.Router();

router.get('/', async (req, res) => {
  const collection = db.collection('users');
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
})

router.get('/:id', async (req, res) => {
  const collection = db.collection('users');
  const result = await collection.findOne({
    _id: new ObjectId(req.params.id)
  })
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
})

router.post('/', async (req, res) => {
  const collection = db.collection('users');
  const newUser = {
    name: req.body.name,
    age: req.body.age,
  };

  try {
    const result = await collection.insertOne(newUser);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding record");
  }
});

router.delete('/', async (req, res) => {
  const collection = db.collection('users');
  try {
    const result = await collection.deleteMany({});
    if (result.deletedCount === 0) {
      res.status(404).send('No users found to delete.');
    } else {
      res.status(200).send(`Deleted ${result.deletedCount} users.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting users');
  }
});

export default router;