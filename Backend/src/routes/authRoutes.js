import express from 'express'
import { RegisterUser,LoginUser, updateUsername,updateEmail} from '../controllers/authController.js'

//import upload  from '../middlewares/uploadMiddleware.js'

const router = express.Router();

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.put('/newUsername',updateUsername);
router.put('/newEmail',updateEmail);



export default router;