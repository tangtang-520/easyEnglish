const Router = require("koa-router");
const { searchWord } = require("../services/search");
const { translate } = require("../services/translate");
const { randomWord } = require("../services/search");

const router = new Router();

// 单词查询
router.get("/word", searchWord);

// 翻译
router.get("/translate", translate);

// 获取随机单词
router.get("/random", randomWord);

module.exports = router;
