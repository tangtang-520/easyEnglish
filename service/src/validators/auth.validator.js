const Joi = require("joi");

// 登录账号密码验证
const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "用户名必须是字符串",
    "string.empty": "用户名不能为空",
    "any.required": "用户名是必填项",
  }),
  password: Joi.string().required().messages({
    "string.base": "密码必须是字符串",
    "string.empty": "密码不能为空",
    "any.required": "密码是必填项",
  }),
});

// 注册账号密码验证
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "用户名必须是字符串",
    "string.empty": "用户名不能为空",
    "string.min": "用户名长度必须至少为 {#limit} 个字符",
    "string.max": "用户名长度不能超过 {#limit} 个字符",
    "any.required": "用户名是必填项",
  }),
  password: Joi.string().length(8).alphanum().required().messages({
    "string.base": "密码必须是字符串",
    "string.empty": "密码不能为空",
    "string.length": "密码长度必须为 {#limit} 个字符",
    "string.alphanum": "密码只能包含字母和数字",
    "any.required": "密码是必填项",
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
};
