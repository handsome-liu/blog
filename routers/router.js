const Router = require('koa-router');
// 拿到 操作 user 表 的 逻辑对象
const user = require('../controller/user');
const router = new Router();

// 设计 主页
router.get('/', user.keepLogin, async (ctx) => {
    // 需要 title 
    await ctx.render('index', {
        title: '假装这是个真正的title '
    });

});

// 用户注册 的 post 路由
router.post('/user/reg', user.reg);

// 用户登录 的 post 路由
router.post('/user/login', user.login);

// 主要用来处理返回 用户登录, 用户注册
router.get(/^\/user\/(?=reg|login)/, async (ctx) => {
    // :id 动态路由, 在ctx.param.id 获取
    // show 为 true, 显示注册, false 显示登录
    const show = /reg/.test(ctx.path);

    // 渲染 register 页面, 需要 show 变量 
    await ctx.render('register', { show });

});

module.exports = router;  