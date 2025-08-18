const Router = require('koa-router');
const userRoutes = require('./user');
const searchRoutes = require('./search');


const router = new Router({
  prefix: '/api'
});


// 注册用户相关路由
router.use('/user', userRoutes.routes(), userRoutes.allowedMethods());

// 搜查词典翻译
router.use('/search',searchRoutes.routes(), searchRoutes.allowedMethods() )

module.exports = router;