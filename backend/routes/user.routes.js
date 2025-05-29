import { Router } from "express"
import { registerUser , loginUser, logoutUser, currentUser } from "../controller/user.controller.js"
import { verifyJwt } from "../middleware/auth.middleware.js"

import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
} from '../controller/task.controller.js'

const router = Router()

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').post( verifyJwt , logoutUser )

router.get('/currentUser', verifyJwt, currentUser)

router.route('/tasks').get(verifyJwt, getTasks).post(verifyJwt, createTask)

router
  .route('/tasks/:id')
  .patch(verifyJwt, toggleTask)
  .delete(verifyJwt, deleteTask)




export default router