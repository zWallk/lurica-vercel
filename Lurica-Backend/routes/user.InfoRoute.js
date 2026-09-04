import { Router } from 'express'
import {UserInfoController} from '../controllers/user.InfoController.js'

export const userInfoRoute = Router()

userInfoRoute.get('/getall', UserInfoController.getAll)