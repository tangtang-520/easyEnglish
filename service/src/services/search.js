const { wordSchema } = require("../validators/search.validator");
const Stardict = require("../models/stardict");
const BaiduiSearch = require("../utils/baiduSearch");

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
module.exports = {
  searchWord,
};
