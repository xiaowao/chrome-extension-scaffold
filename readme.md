# chrome-extension-scaffold

浏览器扩展程序开发框架 vue + webpack 多页面

### Development Setup

``` bash
# install deps
npm install

# build dist files
npm run build

# development
npm run dev
```

### 目录结构

- dist 构建输出目录
- node_modules
- src
  - asset 资源
  - lib 公共js
  - manifest.json 配置文件
  - background 后台页
  - frontend
    - components 组件
    - main-page 主页
    - popup 弹泡页
- webpack.config.js
- package.json