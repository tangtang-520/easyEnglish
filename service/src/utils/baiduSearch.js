const axios = require("axios");
const CryptoJS = require("crypto-js");
const config = require("../config");

function generateSecureRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues); // 浏览器或 Node.js 的 crypto 模块
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

const getWordInfo = async (q, from = "auto", to) => {
  try {
    const salt = generateSecureRandomString(6);
    const sign_str = config.bd.appId + q + salt + config.bd.appKey;
    const sign = CryptoJS.MD5(sign_str).toString();
    const params = {
      q: q,
      from: from,
      to: to,
      appid: config.bd.appId,
      salt: salt,
      sign: sign,
    };
    const result = await axios.get(config.bd.baseUrl, { params: params });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWordInfo,
};
