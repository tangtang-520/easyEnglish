const { DataTypes } = require("sequelize");
const { pool } = require("../db/index");

const Stardict = pool.define(
  "stardict",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "单词",
    },
    sw: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "单词",
    },
    phonetic: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "音标，以英语英标为主",
    },
    definition: {
      type: DataTypes.TEXT,
      comment: "单词释义（英文），每行一个释义",
    },
    translation: {
      type: DataTypes.TEXT,
      comment: "单词释义（中文），每行一个释义",
    },
    pos: {
      type: DataTypes.STRING,
      comment: "词语位置，用 " / " 分割不同位置",
    },
    collins: {
      type: DataTypes.SMALLINT,
      comment: "柯林斯星级，0-5，0表示无星级",
    },
    oxford: {
      type: DataTypes.SMALLINT,
      comment: "是否是牛津三千核心词汇 0 否 1 是",
    },
    tag: {
      type: DataTypes.STRING,
      comment: "字符串标签：zk/中考，gk/高考，cet4/四级 等等标签，空格分割",
    },
    bnc: {
      type: DataTypes.INET,
      comment: "英国国家语料库词频顺序",
    },
    frq: {
      type: DataTypes.INET,
      comment: "当代语料库词频顺序",
    },
    exchange: {
      type: DataTypes.TEXT,
      comment: "时态复数等变换，使用 " / " 分割不同项目，见后面表格",
    },
    detail: {
      type: DataTypes.TEXT,
      comment: "json 扩展信息，字典形式保存例句（待添加）",
    },
    audio: {
      type: DataTypes.TEXT,
      comment: "读音音频 url （待添加）",
    },
  },
  {
    freezeTableName: true, // 不自动将表名添加复数 's'
    timestamps: false, // 不自动添加 createdAt 和 updatedAt 字段
  }
);

module.exports = Stardict;
