const { verifyToken } = require('../utils/jwt');

// 身份校验 
module.exports = () => {
  return async (ctx, next) => {
    const token = ctx.header.authorization;
    
    if (!token) {
      ctx.throw(401, '未提供认证令牌');
    }
    
    const decoded = verifyToken(token.replace('Bearer ', ''));
    if (!decoded) {
      ctx.throw(401, '无效的认证令牌');
    }
    
    ctx.state.user = decoded;
    await next();
  };
};