//@desc Authenticate user
//@route POST /api/auth/user
//@access Public
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

import { generateToken } from './generate-token.js'

// @desc Authenticate user
// @route POST /api/auth/user
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany({
		where: {
			password1: 'werf'
		}
	})
	res.json(user)
})

// @desc Register user
// @route POST /api/auth/user
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Проверка, существует ли пользователь по email
	const isHaveUser = await prisma.user.findUnique({
		where: { email }
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	// Хэшируем пароль
	const hashedPassword = await hash(password, 10)

	// Создаём пользователя
	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			name: faker.name.fullName()
		},
		select: UserFields
	})

	// Генерация токена после создания пользователя
	const token = generateToken(user.id)

	res.json({ user, token })
})

//http://localhost:5000/api/auth/register
