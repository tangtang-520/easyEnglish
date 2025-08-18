const Router = require("koa-router");
const { searchWord } = require("../services/search");

const router = new Router();

// 搜索接口
router.get("/word", searchWord);

module.exports = router;
