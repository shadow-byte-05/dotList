import { AsyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = AsyncHandler(async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body

  if ([username, email, password].some((fields) => fields?.trim === '')) {
    throw new ApiError(400, 'All fields are required')
  }
  const ExistingUser = await User.findOne({
    $or: [{ username }, { email }],
  })
  if (ExistingUser) {
    throw new ApiError(401, 'User already registered')
  }

  const user = await User.create({
    username,
    email,
    password,
  })

  if (!user) {
    throw new ApiError(500, 'something went wrong while registering')
  }
  let accessToken, refreshToken
  try {
    const tokens = await user.createAccessTokenAndRefreshToken()
    accessToken = tokens.accessToken
    refreshToken = tokens.refreshToken
  } catch (error) {
    throw new ApiError(500, 'Failed to generate tokens')
  }
  return res
    .status(200)
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .json(new ApiResponse(200, user, 'user registered successfully'))
  })

const loginUser = AsyncHandler(async (req, res) => {
  const { identifier, password } = req.body

  if (!identifier || password.trim() === '') {
    throw new ApiError(400, 'All fields are required')
  }
  let username_c = null
  let email_c = null

  if (identifier.includes('@')) {
    email_c = identifier
  } else {
    username_c = identifier
  }
  const user = await User.findOne({
    $or: [{ username: username_c }, { email: email_c }],
  })

  if (!user) {
    throw new ApiError(400, 'User does not exist')
  }

  const auth = await user.isPasswordCorrect(password)
  if (!auth) {
    throw new ApiError(401, 'Credentials not correct')
  }

  let accessToken, refreshToken
  try {
    const tokens = await user.createAccessTokenAndRefreshToken()
    accessToken = tokens.accessToken
    refreshToken = tokens.refreshToken
  } catch (error) {
    throw new ApiError(500, 'Failed to generate tokens')
  }

  const loggedInUserdata = await User.findById(user._id).select(
    '-password -refreshToken'
  )
  const loggedInUser = loggedInUserdata.toObject()

  return res
    .status(200)
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "None" 
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:true,
      sameSite: 'None',
    })
    .json(new ApiResponse(200, loggedInUser, 'User Logged in successfully'))
})



const logoutUser = async(req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,{
        $set:{
          refreshToken: undefined,
        }
    },
    {
      new : true,
    }
  )

  const options = {
    httpOnly : true,
    secure: true,
    sameSite: "None"

  }

  return res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, "User Log Out"))

}

const currentUser  = AsyncHandler(async (req,res) => {
  try {
    const user  = req.user
    if(!user){
      throw new ApiError(401, "User not found")
    }
    
    return res.status(200).json(user)
    
  } catch (error) {
    throw new ApiError(400, Error?.message || "User Credentials Problem")
  }
})

export { registerUser, loginUser, logoutUser, currentUser }
