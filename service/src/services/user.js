const User = require("../models/user.js");
const { encryptPassword, comparePassword } = require("../utils/password.js");
const { creatToken } = require("../utils/jwt.js");
const { Op } = require("sequelize");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator.js");


// 创建用户
const creatUser = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.throw("用户名和密码不能为空");
    }
    // 账号密码校验
    const { error } = registerSchema.validate({ username, password });
    if (error) {
      ctx.throw(error.message);
    }

    // 查找用户是否存在
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      ctx.throw(200, "用户名已存在");
    }

    // 密码加密
    const passwordHash = await encryptPassword(password);

    // 创建用户
    const newUser = await User.create({
      username,
      password: passwordHash,
      email: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!newUser) {
      ctx.throw("注册失败");
    }

    // 返回结果
    ctx.body = {
      code: 0,
      message: "注册成功",
      data: {
        userInfo: {
          id: newUser?.id,
          username: newUser?.username,
          email: newUser?.email,
          created_at: newUser?.created_at,
          updated_at: newUser?.updated_at,
        },
      },
    };
  } catch (error) {
    ctx.throw(error);
  }
};

// 登录
const login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.throw("用户名和密码不能为空");
    }
    // 账号密码校验
    const { error } = loginSchema.validate({ username, password });
    if (error) {
      ctx.throw(error.message);
    }

    // 查找用户是否存在
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });
    // const user = await User.findOne({ where: { username: username } });
    if (!user) {
      ctx.throw("账号或密码错误");
    }

    // 密码校验
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("isMatch===>", isMatch);

      ctx.throw("账号或密码错误");
    }

    // 生成token
    const token = creatToken({
      usernaem: username,
      id: user?.id,
      email: user?.email,
    });
    // 返回结果
    ctx.body = {
      code: 0,
      message: "登录成功",
      data: {
        userInfo: {
          id: user?.id,
          username: user?.username,
          email: user?.email,
          created_at: user?.created_at,
          updated_at: user?.updated_at,
        },
        token: token,
      },
    };
  } catch (error) {
    ctx.throw(200, error.message);
  }
};

module.exports = {
  creatUser,
  login,
};
