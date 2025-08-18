# easyEnglish 项目文档

## 项目概述

easyEnglish 是一个跨平台英语学习应用程序，支持 Web 应用、移动应用和小程序等多种平台。该项目旨在为用户提供便捷、高效的英语学习体验。

## 技术架构

### 前端 (app)

- **框架**: React Native + Expo
- **路由**: Expo Router
- **UI 组件**: GlueStack UI
- **样式**: NativeWind (Tailwind CSS for React Native)
- **状态管理**: React Query
- **网络请求**: Axios

### 后端 (service)

- **框架**: Koa.js
- **数据库**: MySQL + Sequelize ORM
- **认证**: JWT (JSON Web Token)
- **API**: RESTful API
- **验证**: Joi

## 项目结构

```
easyEnglish/
├── app/                 # 前端应用
│   ├── app/                # 应用路由和页面
│   ├── components/         # 可复用组件
│   ├── api/                # API 调用
│   ├── hooks/              # 自定义 React Hooks
│   ├── context/            # React Context
│   ├── constants/          # 常量定义
│   └── assets/             # 静态资源
│
├── service/                # 后端服务
│   ├── src/
│   │   ├── app.js          # 应用入口
│   │   ├── config/         # 配置文件
│   │   ├── controllers/    # 控制器
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由定义
│   │   ├── services/       # 业务逻辑
│   │   ├── middleware/     # 中间件
│   │   ├── validators/     # 数据验证
│   │   ├── utils/          # 工具函数
│   │   └── db/             # 数据库连接
│   └── .env                # 环境变量
```

## 功能特性

- 用户认证与授权
- 个性化学习计划
- 词汇学习与测试
- 阅读理解练习
- 听力训练
- 口语练习
- 学习进度追踪
- 跨平台同步

## 开发指南

### 前端开发

1. 进入前端目录:

   ```bash
   cd app
   ```
2. 安装依赖:

   ```bash
   npm install
   ```
3. 启动开发服务器:

   ```bash
   npm start
   ```
4. 选择运行平台:

   - Web: `npm run web`
   - iOS: `npm run ios`
   - Android: `npm run android`

### 后端开发

1. 进入后端目录:

   ```bash
   cd service
   ```
2. 安装依赖:

   ```bash
   npm install
   ```
3. 配置环境变量:

   - 复制 `.env.example` 到 `.env`
   - 根据需要修改配置
4. 启动开发服务器:

   ```bash
   npm run dev
   ```

## 部署指南

### 前端部署

- Web: 使用 Expo 构建 Web 版本并部署到静态托管服务
- 移动应用: 通过 Expo 构建原生应用并发布到应用商店
- 小程序: 导出小程序代码并上传到微信开发者平台

### 后端部署

1. 构建生产版本:

   ```bash
   npm run build
   ```
2. 启动服务:

   ```bash
   npm start
   ```

## 贡献指南

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件
