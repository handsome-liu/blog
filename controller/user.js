const { db } = require('../schema/config');
const encrypto = require('../util/encrypto');
const UserSchema = require('../schema/user');

// 通过 db 对象 创建 操作 user 数据库的模型对象, 格式限制是 schema, 表名为 第一个参数的 复数形式 city => cities, class => classes
const User = db.model('users', UserSchema);

// 用户注册 的 post 路由 响应函数
const reg = async ctx => {

    // 用户注册时, post 发过来的 数据
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;

    // 去数据库 users 集合 检查下数据, 需要异步
    await new Promise((resolve, reject) => {

        // 去 users 数据库查询
        User.find({ username }, (err, data) => {

            // 数据库查询 出错, 成功: err 为 null
            if (err) return reject(err);

            // 查询到数据 表示 用户名存在
            if (data.length !== 0) return resolve('');

            // 数据库没有该数据, 用户名不存在 需要存到数据库, 需要加密
            const user = new User({
                username,
                password: encrypto(password)
            });

            // 保存 数据到到数据库
            user.save((err, data) => {

                // 判断 是否 成功, 成功: err 为 null
                err ? reject(err) : resolve(data);

            });

        });

    })
        .then(async data => {

            if (data) {

                // 注册成功
                await ctx.render('isOK', {
                    status: '注册成功'
                });

            } else {

                // 用户名已存在
                await ctx.render('isOK', {
                    status: '用户名已存在'
                });

            }
        })
        .catch(async err => {

            // 注册失败
            await ctx.render('isOK', {
                status: '注册失败,请重试.'
            });

        });

};

// 用户登录 的 post 路由 响应函数
const login = async ctx => {
    console.log('用户需要登录,登录的数据:');
    console.log(ctx.request.body);

    // 用户登录时, post 发过来的 数据
    const user = ctx.request.body;
    const username = user.username;
    const password = user.password;

    // 数据库操作, 需要异步
    await new Promise((resolve, reject) => {

        // 去 users 数据库查询 username
        User.find({ username }, (err, data) => {


            // 数据库查询 出错, 登录失败, 成功: err 为 null
            if (err) return reject(err);

            // 数据库没有该数据, 登录失败, 用户名不存在
            if (data.length === 0) return reject('用户名不存在');

            // 
            // 查询到 数据, 把用户 传过来的密码 加密后, 和数据库的密码比对
            // return data[0].password === encrypto(password) && resolve(data) || resolve('');
            if (data[0].password === encrypto(password)) {
                return resolve(data);
            } else {
                return resolve('');
            }

        });

    })
        .then(async data => {

            // 密码错误, data 为 空字符串
            if (data) {

                // 让用户 在他的 cookie 里设置 username password 加密后的密码 权限

                await ctx.render('isOK', {
                    status: '登录成功'
                });

            } else {

                await ctx.render('isOK', {
                    status: '密码不正确,登录失败'
                });

            }

        })
        .catch(async err => {

            await ctx.render('isOK', {
                status: err
            });

        });


};

// 
const keepLogin = async ctx => {

};

// 导出 一个 user 对象, 内有各种 路由处理
module.exports = {
    reg,
    login,
    keepLogin
};