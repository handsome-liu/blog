# blog

node 博客,用koa,pug,MongoDB来写

mongodb 启动

`mongod --dbpath ./database/db`

app server 服务启动

```
node app

nodemon app
```


-------
# 项目编写流程记录

github 创建一个项目仓库 blog

然后 克隆到 本地

`git clone https://github.com/handsome-liu/blog.git`

npm 初始化

`npm init -y`

创建 mongodb 的文件夹 db, 在当前项目目录下, /blog

`mongod --dbpath ./db`

创建一个 入口js文件 app.js
