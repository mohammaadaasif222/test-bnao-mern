import express from  'express'
import {
    getUsers,
    forgotPassword,
    resetPassword 
}  from '../controllers/users.js'
import {verifyToken}  from '../middleware/auth.js'
const router  = express.Router();
 
router.route('/').get( verifyToken, getUsers);
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)



export default router;