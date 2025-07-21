// @desc Get workoutLog
// @route GET /api/workouts/log/:id
// @access Private
import asyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

import { addPrevValues } from './add-prev-values.util.js'

export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLog = await prisma.workoutLog.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			workout: true,
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	})

	if (!workoutLog) {
		res.status(404)
		throw new Error('Workout log not found')
	}

	res.json({
		...workoutLog,
		times: addPrevValues(workoutLog, prevWorkoutLog)
	})
})
