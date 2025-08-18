# EasyEnglish Backend Service

基于Koa和MySQL的英语学习应用后端服务。

## 项目结构

```
service/
├── src/
│   ├── config/         # 配置文件
│   ├── controllers/    # 控制器层，处理HTTP请求
│   ├── db/             # 数据库相关文件
│   ├── middleware/     # 中间件
│   ├── models/         # 数据模型（可选）
│   ├── routes/         # 路由定义
│   ├── services/       # 业务逻辑层
│   ├── utils/          # 工具函数
│   └── app.js          # 应用入口文件
├── logs/               # 日志文件
├── .env                # 环境变量（不提交到版本控制）
├── .env.example        # 环境变量示例
└── package.json        # 项目依赖
```

## 安装

```bash
# 安装依赖
npm install

# 创建环境变量文件
cp .env.example .env
```

## 数据库设置

1. 确保MySQL服务已启动
2. 创建数据库和表结构：

```bash
mysql -u root -p < src/db/init.sql
```

## 运行

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## API 端点

### 用户管理

- `GET /api/users` - 获取所有用户
- `GET /api/users/:id` - 获取单个用户
- `POST /api/users` - 创建新用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

## 开发

### 添加新路由

1. 在 `src/routes` 目录下创建新的路由文件
2. 在 `src/routes/index.js` 中注册新路由
3. 创建对应的控制器和服务

### 环境变量

开发中使用的关键环境变量：

- `PORT` - 服务器端口
- `NODE_ENV` - 环境（development/production）
- `DB_HOST` - 数据库主机
- `DB_PORT` - 数据库端口
- `DB_USER` - 数据库用户名
- `DB_PASSWORD` - 数据库密码
- `DB_NAME` - 数据库名称