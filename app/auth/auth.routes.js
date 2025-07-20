import express from 'express'

import * as methods from './auth.controller.js'

const router = express.Router()

router.route('/login').post(methods.authUser)
router.route('/register').post(methods.registerUser)

export default router
//localhost:4200/api/auth/login
