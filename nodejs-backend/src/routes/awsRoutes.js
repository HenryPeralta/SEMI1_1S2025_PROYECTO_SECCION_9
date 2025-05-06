import express from 'express'

import {
  index,
  synthesize,
  // lex,
  translate,
  ses
} from '../controllers/awsController.js'

const router = express.Router()

// Index
router.get('/', index)

// Polly
router.post('/polly', synthesize)

// Translate
router.post('/traducir', translate)

// SES
router.post('/send-email', ses)

export default router
