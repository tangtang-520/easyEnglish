const Joi = require("joi");


// 验证搜索的单词
const wordSchema = Joi.object({
  word: Joi.string().trim().required().messages({
    "string.base": "类型必须是字符串",
    "string.empty": "不能为空",
    "any.required": "必填项",
  }),
});

module.exports = {
  wordSchema,
};