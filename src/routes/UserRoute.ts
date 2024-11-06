import express from 'express';
import { 
  createUser, 
  getAllUsers, 
  searchInput, 
  login, 
  checkEmail, 
  getSingleUser, 
  updateUser, 
  exportUsersList, 
  deleteUser, 
  checkToken
} from '../controller/UserController'; 
import { authenticateToken } from '../util/authMiddleware';

const router = express.Router();

// Routes without authentication
router.post('/login', login);
router.post('/check-email', checkEmail);

// Routes with authentication
router.post('/createUser', authenticateToken, createUser);
router.get('/users', authenticateToken, getAllUsers);
router.post('/users/searchUsers', authenticateToken, searchInput);
router.get('/user/:id', authenticateToken, getSingleUser);
router.patch('/updateUser/:id', authenticateToken, updateUser);
router.get('/export-users', authenticateToken, exportUsersList);
router.delete('/deleteUser/:email', authenticateToken, deleteUser);
router.post('/auth/google', checkToken);

export default router;