import express from 'express';
import userCotroller from '../controllers/userCotroller.js';
import checkAuthUser from '../middlewares/auth-middleware.js';

const router = express.Router();
router.use(express.json());

//unprotected route
router.post('/register', userCotroller.register);
router.post('/login', userCotroller.login);
router.post('/getjobs', userCotroller.getJobs);
router.get('/jobdescription/:id', userCotroller.jobDescription);
router.post('/filterjobs', userCotroller.getJobs);
router.get('/loggedin', userCotroller.loggedIn);
// router.delete('/deleteall',userCotroller.deleteAllJobs);

//  Protected route
router.post('/jobpost', checkAuthUser,  userCotroller.jobPost)
router.put('/editjob/:id', checkAuthUser, userCotroller.editJob);


export default router;