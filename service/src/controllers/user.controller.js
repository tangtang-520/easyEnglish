const userService = require('../services/user.service');
const { logger } = require('../utils/logger');

/**
 * 获取所有用户
 */
async function getAllUsers(ctx) {
  try {
    const users = await userService.getAllUsers();
    ctx.body = {
      success: true,
      data: users
    };
  } catch (error) {
    logger.error('Error getting all users:', error);
    ctx.throw(500, 'Failed to retrieve users');
  }
}

/**
 * 根据ID获取用户
 */
async function getUserById(ctx) {
  const { id } = ctx.params;
  
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: `User with ID ${id} not found`
      };
      return;
    }
    
    ctx.body = {
      success: true,
      data: user
    };
  } catch (error) {
    logger.error(`Error getting user ${id}:`, error);
    ctx.throw(500, 'Failed to retrieve user');
  }
}

/**
 * 创建新用户
 */
async function createUser(ctx) {
  const userData = ctx.request.body;
  
  try {
    const newUser = await userService.createUser(userData);
    ctx.status = 201;
    ctx.body = {
      success: true,
      data: newUser
    };
  } catch (error) {
    logger.error('Error creating user:', error);
    ctx.throw(500, 'Failed to create user');
  }
}

/**
 * 更新用户
 */
async function updateUser(ctx) {
  const { id } = ctx.params;
  const userData = ctx.request.body;
  
  try {
    const updatedUser = await userService.updateUser(id, userData);
    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: `User with ID ${id} not found`
      };
      return;
    }
    
    ctx.body = {
      success: true,
      data: updatedUser
    };
  } catch (error) {
    logger.error(`Error updating user ${id}:`, error);
    ctx.throw(500, 'Failed to update user');
  }
}

/**
 * 删除用户
 */
async function deleteUser(ctx) {
  const { id } = ctx.params;
  
  try {
    const result = await userService.deleteUser(id);
    if (!result) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: `User with ID ${id} not found`
      };
      return;
    }
    
    ctx.status = 204; // No Content
  } catch (error) {
    logger.error(`Error deleting user ${id}:`, error);
    ctx.throw(500, 'Failed to delete user');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};