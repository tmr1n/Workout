// @desc Update exercise log time
// @route PUT /api/exercises/log/time/:id
// @access Private
import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

export const updateExerciseLogTime = asyncHandler(async (req, res) => {
	const { weight, repeat, isComplete } = req.body
	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.id
			},
			data: {
				weight,
				repeat,
				isComplete
			}
		})

		res.json(exerciseLogTime)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log not found')
	}
})

// @desc Update status of complete exercise log
// @route PATCH /api/exercises/log/complete/:id
// @access Private
export const completeExerciseLog = asyncHandler(async (req, res) => {
	const { isComplete } = req.body
	try {
		const exerciseLog = await prisma.exerciseLog.update({
			where: {
				id: +req.params.id
			},
			data: {
				isComplete
			},
			include: { exercise: true, workoutLog: true }
		})

		res.json(exerciseLog)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log not found')
	}
})
