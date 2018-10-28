const { join } = require('path');
const Koa = require('koa');
const static = require('koa-static');
const views = require('koa-views');
const logger = require('koa-logger');
const router = require('./routers/router');
const body = require('koa-body');
// 实例化 koa
const app = new Koa();

// 注册日志模块
app.use(logger());

// 配置 静态资源 目录
app.use(static(join(__dirname, 'public')));

// 配置 视图 模板
app.use(views(join(__dirname, 'views'), {
    extension: 'pug'
}));

// 配置koa-body, 处理 post 请求数据
app.use(body());


// 注册 路由信息, 监听端口 3000
app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => { console.log('app start! url:127.0.0.1:3000'); })