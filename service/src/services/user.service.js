const db = require('../db');
const { logger } = require('../utils/logger');

/**
 * 获取所有用户
 */
async function getAllUsers() {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    logger.error('Database error in getAllUsers:', error);
    throw error;
  }
}

/**
 * 根据ID获取用户
 */
async function getUserById(id) {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    logger.error(`Database error in getUserById(${id}):`, error);
    throw error;
  }
}

/**
 * 创建新用户
 */
async function createUser(userData) {
  try {
    const { username, email, password } = userData;
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [username, email, password]
    );
    
    if (result.insertId) {
      return getUserById(result.insertId);
    }
    return null;
  } catch (error) {
    logger.error('Database error in createUser:', error);
    throw error;
  }
}

/**
 * 更新用户
 */
async function updateUser(id, userData) {
  try {
    const { username, email } = userData;
    const [result] = await db.query(
      'UPDATE users SET username = ?, email = ?, updated_at = NOW() WHERE id = ?',
      [username, email, id]
    );
    
    if (result.affectedRows > 0) {
      return getUserById(id);
    }
    return null;
  } catch (error) {
    logger.error(`Database error in updateUser(${id}):`, error);
    throw error;
  }
}

/**
 * 删除用户
 */
async function deleteUser(id) {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    logger.error(`Database error in deleteUser(${id}):`, error);
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};