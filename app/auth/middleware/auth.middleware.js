import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import { prisma } from '../../prisma.js'
import { UserFields } from '../../utils/user.utils.js'

export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		//console.log('Token:', token)

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		//console.log('Decoded Token:', decoded)

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.userID
			},
			select: UserFields
		})

		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})
