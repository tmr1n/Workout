import jwt from 'jsonwebtoken'

export const generateToken = userID =>
	jwt.sign(
		{
			userID
		},
		process.env.ACCESS_TOKEN,
		{
			expiresIn: '10d'
		}
	)
