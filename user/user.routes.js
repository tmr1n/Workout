import express from 'express'

import { protect } from '../app/auth/middleware/auth.middleware.js'

import { getUserProfile } from './user.controller.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile)

export default router
//localhost:4200/api/user/profile
