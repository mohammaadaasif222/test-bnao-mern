import express from 'express'
const router = express.Router();
import { getFeedPosts, getUserPosts,commentToPost, likeToPost,getPost, deleteUserPost,updateUserPost } from '../controllers/posts.js'
import {verifyToken} from '../middleware/auth.js'

router.route('/feeds').get(getFeedPosts);
router.route('/feeds/:id').get(getPost);
router.route('/user').get( verifyToken, getUserPosts);
router.route('/:id').delete( verifyToken,deleteUserPost);
router.route('/:id').put( verifyToken, updateUserPost);
router.route('/like/:id').post( verifyToken, likeToPost)
router.route('/comment/:id').post( verifyToken, commentToPost)

export default router