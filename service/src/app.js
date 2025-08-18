const Koa = require("koa");
const { koaBody } = require("koa-body");
const koaJwt = require('koa-jwt');
const path = require("path");
const { logger } = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes");
const config = require("./config");
const { secret } = require("./utils/jwt");
const cors = require('@koa/cors');



// 初始化应用
const app = new Koa();

// 本地开发暂时 允许所有来源
app.use(cors());

// 全局错误处理
app.use(errorHandler);

// 请求体解析
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "./upload"),
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    },
  })
);


// jwt 验证中间件（排除 /login）
app.use(
  koaJwt({ secret }).unless({
    path: ['/api/user/login', '/api/user/register']
  })
);


// 路由
app.use(router.routes()).use(router.allowedMethods());



// 启动服务器
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});

module.exports = app;
