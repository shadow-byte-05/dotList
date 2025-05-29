import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'

const verifyJwt = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '').trim()

    if (!token) {
      return next(new ApiError(401, 'Unauthorized access'))
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    )

    if (!user) {
      return next(new ApiError(401, 'Invalid Access Token'))
    }

    req.user = user
    
    next()
  } catch (error) {
    next(new ApiError(401, 'Invalid Token'))
  }
})

export { verifyJwt }
