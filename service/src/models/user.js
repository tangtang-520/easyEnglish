const { Sequelize, DataTypes } = require("sequelize");

const { pool } = require("../db/index");

const User = pool.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // 在这里定义模型属性
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "用户名",
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      comment: "密码",
    },
    email: {
      type: DataTypes.STRING,
      comment: "邮箱",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: "创建时间",
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: "更新时间",
    },
  },
  {
    // 这是其他模型参数
    underscored: true, // 将驼峰命名转换为下划线命名
  }
);

module.exports = User;
