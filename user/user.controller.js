import asyncHandler from 'express-async-handler'

import { prisma } from '../app/prisma.js'
import { UserFields } from '../app/utils/user.utils.js'

//@desc Get user profile
//@route GET /api/user/profile
//@access Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: 1
		},
		select: UserFields
	})

	res.json(user)
})
