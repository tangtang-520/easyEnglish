const { logger } = require("../utils/logger");

/**
 * 全局错误处理中间件
 */
async function errorHandler(ctx, next, message) {
  try {
    await next();
  } catch (err) {
    console.log("errorHandler===>", err);

    logger.error("Server error:", err);

    // 设置状态码
    ctx.status = err.status || 500;

    if (err.status === 401) {
      message = "无效令牌";
    }

    // 设置响应体
    ctx.body = {
      code: 1,
      message: message || err.message || "Internal Server Error",
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    };
  }
}

module.exports = errorHandler;
