var jwt = require("jsonwebtoken");


const secret = "shhhhh**(()&_@@(MMJJA@21·、の、";
// 生成token
const creatToken = (obj) => {
  return jwt.sign(obj, secret, { expiresIn: "7d" });
};

// 验证token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
module.exports = {
  creatToken,
  verifyToken,
  secret,
};
