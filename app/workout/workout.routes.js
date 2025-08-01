import express from 'express'

import { protect } from '../auth/middleware/auth.middleware.js'

import { createNewWorkoutLog } from './log/workout-log.controller.js'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewWorkout).get(protect, getWorkouts)

router
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

router.route('/log/:id').post(protect, createNewWorkoutLog)

export default router
//localhost:4200/api/workouts
