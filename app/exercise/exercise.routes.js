import express from 'express'

import { protect } from '../auth/middleware/auth.middleware.js'

import { createNewExercise, getExercises } from './exercise.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercises)

export default router
//localhost:4200/api/exercises
