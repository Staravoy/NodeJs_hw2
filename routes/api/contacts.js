const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const {HttpError} = require('../../helpers');

const router = express.Router();

const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(phonePattern).required(),
});


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      let name_error = '';

      if (error.details && error.details.length > 0) {
        name_error = error.details[0].path[0];
      }

      throw HttpError(400, `missing required ${name_error} field`);
    }

    const result = await contacts.addContact(req.body.name, req.body.email, req.body.phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});


router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'Missing request body');
    }

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `Missing required ${error.details[0].path[0]} field`);
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
