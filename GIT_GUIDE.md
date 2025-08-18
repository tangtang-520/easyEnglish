# Git 版本控制指南

## .gitignore 文件说明

本项目包含一个全面的 `.gitignore` 文件，用于排除不需要上传到 GitHub 的文件和目录。以下是主要排除的内容：

### 依赖文件
- `node_modules/` - 依赖包目录
- 包管理器锁定文件 (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`)
- 调试日志文件

### 环境配置
- `.env` 文件及其变体 - 包含敏感信息的环境变量文件

### 构建输出
- `dist/`, `build/`, `.expo/` 等构建输出目录

### 系统和编辑器文件
- `.DS_Store`, `Thumbs.db` 等操作系统生成的文件
- `.idea/`, `.vscode/` 等 IDE 和编辑器配置文件

### 临时文件和日志
- 各种日志文件和临时目录

## 使用 Git 的最佳实践

1. **初始化仓库**:
   ```bash
   git init
   ```

2. **添加文件到暂存区**:
   ```bash
   git add .
   ```

3. **提交更改**:
   ```bash
   git commit -m "初始提交"
   ```

4. **添加远程仓库**:
   ```bash
   git remote add origin <GitHub仓库URL>
   ```

5. **推送到远程仓库**:
   ```bash
   git push -u origin main
   ```

## 注意事项

- 确保不要将敏感信息（如 API 密钥、数据库密码等）提交到 Git 仓库
- 使用环境变量存储敏感信息，并将其添加到 `.env` 文件中
- 创建 `.env.example` 文件作为环境变量的模板，但不包含实际的敏感值
- 定期更新 `.gitignore` 文件以适应项目的变化

## 特殊目录

- `service/src/upload/` - 此目录用于存储上传的文件，但目录中的文件不会被提交到 Git 仓库