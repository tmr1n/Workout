// @desc Get exerciseLog
// @route GET /api/exercises/log/:id
// @access Private
import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

import { addPrevValues } from './add-prev-values.util.js'

export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exerciseLogs: true,
			times: {
				orderBy: { id: 'asc' }
			}
		}
	})

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise log not found')
	}

	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			exerciseId: exerciseLog.exerciseId,
			userId: req.user.id,
			isComplete: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			times: true
		}
	})

	res.json({
		...exerciseLog,
		times: addPrevValues(exerciseLog, prevExerciseLog)
	})
})
