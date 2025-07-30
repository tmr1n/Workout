// @desc Update workout log time
// @route PUT /api/workouts/log/time/:id
// @access Private
import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

export const updateWorkoutLogTime = asyncHandler(async (req, res) => {
	const { weight, repeat, isComplete } = req.body
	try {
		const workoutLogTime = await prisma.workoutLogTime.update({
			where: {
				id: +req.params.id
			},
			data: {
				weight,
				repeat,
				isComplete
			}
		})

		res.json(workoutLogTime)
	} catch (error) {
		res.status(404)
		throw new Error('Workout log not found')
	}
})

// @desc Update status of complete workout log
// @route PATCH /api/workouts/log/complete/:id
// @access Private
export const completeWorkoutLog = asyncHandler(async (req, res) => {
	const { isComplete } = req.body
	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: +req.params.id
			},
			data: {
				isComplete
			},
			include: { exercise: true, workoutLog: true }
		})

		res.json(workoutLog)
	} catch (error) {
		res.status(404)
		throw new Error('Workout log not found')
	}
})
