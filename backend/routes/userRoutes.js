import express from 'express'
import {registerUser, loginUser, getCurrentUser, updateProfile, updatePassword} from '../controller/userController.js'
import authMiddleware from '../middleware/auth.js';
import { registerRules, loginRules, profileRules } from '../middleware/validators.js';

const Router = express.Router();

Router.post('/Register', registerRules, registerUser)
Router.post('/Login', loginRules, loginUser)

Router.get('/me', authMiddleware, getCurrentUser);
Router.put('/Profile', authMiddleware, profileRules, updateProfile)
Router.put('/Password', authMiddleware, updatePassword)

export default Router; 