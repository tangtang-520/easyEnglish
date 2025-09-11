const { wordSchema } = require("../validators/search.validator");
const Ecdict = require("../models/ecdict");

// 单词查询接口
const searchWord = async (ctx) => {
  try {
    const { word } = ctx.request.query;
    const { error } = wordSchema.validate({ word });
    if (error) {
      return ctx.throw(error.message);
    }
    const wordInfo = await Stardict.findOne({
      where: {
        sw: word,
      },
    });

    return (ctx.body = {
      code: 0,
      message: "查询成功",
      data: {
        wordInfo: wordInfo,
      },
    });
  } catch (error) {
    ctx.throw(200, error.message);
  }
};

// 随机查询单词
const randomWord = async (ctx) => {
  try {
    const wordInfo = await Ecdict.findAll({
      order: Ecdict.sequelize.random(),
      limit: 10,
    });
    if (!wordInfo) {
      return ctx.throw(200, "查询失败");
    }
    return (ctx.body = {
      code: 0,
      message: "查询成功",
      data: {
        wordInfo: wordInfo,
      },
    });
  } catch (error) {
    ctx.throw(200, error.message);
  }
};
module.exports = {
  searchWord,
  randomWord
};
