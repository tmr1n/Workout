//@desc Authenticate user
//@route POST /api/auth/user
//@access Public
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Authenticate user
// @route POST /api/auth/user
// @access Public
export const authUser = asyncHandler (async (req, res) => {
	const user = await prisma.user.findMany({
		where: {
			password1:'werf'
		}
	})
	res.json(user)
})

// @desc Register user
// @route POST /api/auth/user
// @access Public

export const registerUser = asyncHandler (async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: password
		}
	})

	res.json(req.body)
})
//http://localhost:5000/api/auth/register