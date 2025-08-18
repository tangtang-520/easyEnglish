const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

// 加密密码
const encryptPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// 验证密码
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
