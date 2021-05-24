const { Router } = require('express');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');
const router = Router();
require('dotenv').config();
var mongoose = require('mongoose');

router.post(
  '/contact_create',
  [
    check('phone', 'Телефон в формате +380....').isMobilePhone('uk-UA'),
    check('name', 'Введите имя').isLength({ min: 2 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data',
        });
      }

      const { name, phone } = req.body;

      const contact = new Contact({
        name,
        phone,
      });
      await contact.save();

      if (contact) {
        const contacts = await Contact.find();
        return res.status(201).json({ contacts });
      }
    } catch (e) {
      res.status(500).json({ message: 'error, try again' });
    }
  }
);

router.get('/all_contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json({ contacts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'error, try again!!!!!!!' });
  }
});

router.delete('/del_conact/:_id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params._id);
    return res.json({ message: 'contact delete' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'error, try again!!!!!!!' });
  }
});

router.put(
  '/edit_contact/:id',
  [
    check('phone', 'Телефон в формате +380....').isMobilePhone('uk-UA'),
    check('name', 'Введите имя').isLength({ min: 2 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data',
        });
      }
      await Contact.findByIdAndUpdate({ _id: req.params.id }, req.body);
      const contacts = await Contact.find();
      return res.status(201).json(contacts);
    } catch (e) {
      res.status(500).json({ message: 'error, try again' });
    }
  }
);

module.exports = router;
