import asyncHandler from 'express-async-handler'

import { prisma } from '../app/prisma.js'
import { UserFields } from '../app/utils/user.utils.js'

//@desc Get user profile
//@route GET /api/user/profile
//@access Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	})

	const countExerciseTimesCompleted = await prisma.exerciseLog.count({
		where: {
			userId: req.user.id,
			isComplete: true
		}
	})

	const kgs = await prisma.exerciseTime.aggregate({
		where: {
			exerciseLog: {
				userId: req.user.id
			},
			isComplete: true
		},
		_sum: {
			weight: true
		}
	})

	const workouts = await prisma.workoutLog.count({
		where: {
			userId: user.id,
			isComplete: true
		}
	})

	res.json([
		{ label: 'Minutes', value: Math.ceil(countExerciseTimesCompleted * 2.3) },
		{ label: 'Workouts', value: workouts },
		{ label: 'Kgs', value: kgs._sum.weight || 0 }
	])
})
