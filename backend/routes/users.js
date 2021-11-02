const router = require('express').Router();
const {
  validateUserId, validateUpdateProfile, validateAvatar,
} = require('../middlewares/validate');
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
