import express, { Request, Response } from 'express'

import AuthController from '@controllers/AuthController'
import UserController from '@controllers/UserController'
import EventController from '@controllers/EventController'
import authMiddleware from '@config/auth'

require('dotenv').config()

const routes = express.Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Welcome to WebCalendar API' })
})

const authController = new AuthController()
const userController = new UserController()
const eventController = new EventController()

routes.post('/login', authController.login)
// routes.put('/passwordRecovery', authController.passwordRecovery)

routes.post('/user/create', userController.create)
routes.get('/user/show', authMiddleware, userController.show)
routes.get('/user/get', authMiddleware, userController.get)
// routes.put('/user/update', authMiddleware, userController.update)
// routes.delete('/user/delete', authMiddleware, userController.delete)

routes.post('/event/create', eventController.create)
routes.get('/event/show', authMiddleware, eventController.show)
routes.get('/event/get', authMiddleware, eventController.get)
// routes.put('/user/update', authMiddleware, userController.update)
// routes.delete('/user/delete', authMiddleware, userController.delete)

export default routes
