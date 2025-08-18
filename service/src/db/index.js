// const mysql = require('mysql2/promise');
const config = require('../config');
// const { logger } = require('../utils/logger');
const { Sequelize } = require('sequelize');

// 
const pool = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',

});


// 测试数据库连接
async function testConnection() {
 try {
  await pool.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

}

// // 初始化数据库
// async function initDatabase() {
//   try {
//     await testConnection();
//     // 这里可以添加数据库初始化逻辑，如创建表等
//     logger.info('Database initialized successfully');
//   } catch (error) {
//     logger.error('Database initialization failed:', error);
//     process.exit(1);
//   }
// }

module.exports = {
  pool,
  testConnection,
  // initDatabase,
  // query: (sql, params) => pool.query(sql, params)
};