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
    // 百度翻译
    const baiduResult = await BaiduiSearch.getWordInfo(word,'auto','zh')
        
    const wordInfo = await Stardict.findOne({
      where: {
        sw: word,
      },
    });

    return (ctx.body = {
      code: 0,
      message: "查询成功",
      data: {
        // 自己数据库数据
        wordInfo: wordInfo,
        baiduInfo: baiduResult || {},
        // 百度翻译数据
      },
    });
  } catch (error) {
    ctx.throw(error.message);
  }
};
module.exports = {
  searchWord,
};
