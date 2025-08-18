const Router = require('koa-router');
const { creatUser, login } = require('../services/user');

const router = new Router();


// 登录
router.post('/login', login)

// 获取所有用户
// router.get('/', userController.getAllUsers);

// // 获取单个用户
// router.get('/:id', userController.getUserById);

// 创建用户
router.post('/register', creatUser);

// 更新用户
// router.put('/:id', userController.updateUser);

// // 删除用户
// router.delete('/:id', userController.deleteUser);

module.exports = router;