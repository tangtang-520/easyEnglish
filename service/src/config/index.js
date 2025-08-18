require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  
  // 数据库配置
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'xiaotang',
    database: process.env.DB_NAME || 'dictionary',
    connectionLimit: 10
  },

  // 百度翻译API配置
  bd:{
    appId: process.env.APP_ID,
    appKey: process.env.APP_KEY,
    baseUrl: process.env.BASE_URL,
  }
};