const BaiduiSearch = require("../utils/baiduSearch");

const translate = async (ctx) => {
  try {
    const { text } = ctx.request.query;
    if (!text.trim()) {
      ctx.throw("翻译内容不能为空");
    }
    const baiduResult = await BaiduiSearch.getWordInfo(text, "auto", "zh");
    return (ctx.body = {
      code: 0,
      message: "查询成功",
      data: {
        content: baiduResult || null,
      },
    });
  } catch (error) {
    ctx.throw(200, error.message);
  }
};
module.exports = {
  translate,
};
