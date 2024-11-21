---

### **1. 什么是 Docsify？**
- Docsify 是一个基于 JavaScript 的工具，直接将 Markdown 文件转化为网站内容。
- **无需构建**：不需要生成静态文件，直接使用浏览器加载。
- **实时预览**：实时渲染 Markdown 文件，非常适合动态更新文档。

---

### **2. 环境准备**
#### **安装 Node.js**
- Docsify 依赖 Node.js 和 npm。先确保系统安装了 Node.js：
  - [Node.js 下载](https://nodejs.org/)
  - 安装后，用命令行检查：
    ```bash
    node -v
    npm -v
    ```

#### **安装 Docsify**
- 在命令行中运行：
  ```bash
  npm install -g docsify-cli
  ```
  安装完成后，可以通过以下命令确认：
  ```bash
  docsify -v
  ```

---

### **3. 快速启动一个 Docsify 项目**
#### **创建项目目录**
1. 创建一个文件夹用于存放文档：
   ```bash
   mkdir my-docs
   cd my-docs
   ```
2. 初始化 Docsify 项目：
   ```bash
   docsify init .
   ```
   这会生成以下文件：
   - `index.html`：主入口文件。
   - `README.md`：首页内容。
   - `.nojekyll`：防止 GitHub Pages 处理 Markdown 文件。

#### **启动本地服务**
1. 在项目目录中启动服务器：
   ```bash
   docsify serve
   ```
2. 打开浏览器，访问 `http://localhost:3000`，即可看到你的文档网站。

---

### **4. 文件结构与内容**
- **`README.md`**：文档首页内容，支持 Markdown 语法。
- **其他 Markdown 文件**：可以为不同页面创建独立的 Markdown 文件。例如：
  - `guide.md`：存放指南内容。
  - `api.md`：存放 API 文档。

#### **目录结构示例**
```plaintext
my-docs/
├── index.html  # 项目入口
├── README.md   # 首页内容
├── guide.md    # 指南页面
├── api.md      # API 文档
```

在 `README.md` 中可以通过链接跳转到其他页面：
```markdown
# 欢迎使用 Docsify
- [指南](guide.md)
- [API 文档](api.md)
```

---

### **5. 自定义配置**
#### **修改侧边栏**
1. 创建一个 `_sidebar.md` 文件，设置文档的侧边导航：
   ```markdown
   - [首页](/)
   - [指南](guide.md)
   - [API 文档](api.md)
   ```

#### **修改顶部导航**
1. 创建一个 `_navbar.md` 文件，设置顶部导航栏：
   ```markdown
   - [首页](/)
   - [GitHub](https://github.com)
   ```

#### **自定义主题**
- Docsify 提供内置的主题配置，可以通过 `index.html` 文件进行修改：
  ```html
  <script>
    window.$docsify = {
      name: '我的文档',
      repo: 'https://github.com/你的仓库',
      loadSidebar: true,
      loadNavbar: true,
    };
  </script>
  ```

---

### **6. 部署 Docsify 网站**
#### **1. 使用 GitHub Pages**
1. 初始化 Git 仓库并推送到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
2. 在 GitHub 的仓库设置中，启用 GitHub Pages，选择 `main` 分支作为来源。
3. 访问 `https://your-username.github.io/your-repo` 即可查看网站。

#### **2. 部署到其他平台**
- **Netlify**：上传 Docsify 项目文件夹，一键部署。
- **Vercel**：通过 Vercel CLI 或网页直接连接 GitHub 仓库。

---

### **7. 插件与进阶功能**
#### **常用插件**
1. **搜索插件**：
   在 `index.html` 中添加：
   ```html
   <script src="//unpkg.com/docsify/lib/plugins/search.min.js"></script>
   ```
   配置搜索：
   ```html
   <script>
     window.$docsify = {
       search: 'auto'
     };
   </script>
   ```

2. **代码高亮**：
   添加代码高亮插件：
   ```html
   <script src="//unpkg.com/prismjs/prism.js"></script>
   ```

3. **分页插件**：
   添加分页导航：
   ```html
   <script src="//unpkg.com/docsify-pagination/dist/docsify-pagination.min.js"></script>
   ```

#### **定制主题**
- Docsify 支持定制 CSS，可以通过在 `index.html` 中添加自定义样式来更改外观：
  ```html
  <style>
    body {
      font-family: Arial, sans-serif;
    }
  </style>
  ```

---

通过以上方法，你可以快速构建一个灵活、动态的文档站点，并根据需要不断优化和扩展功能！
