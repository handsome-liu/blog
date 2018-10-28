// 连接数据库, 导出 db Schema
const mongoose = require('mongoose');

// 连接 数据库 handsomeBlog, 如果 不存在, 则 自动创建一个, 新版本 需要 添加 用户名url检查, 返回 数据库 操作 对象
const db = mongoose.createConnection('mongodb://localhost:27017/blogprojectTest', { useNewUrlParser: true });

// 用原生 ES6 的 promise 代替 mongoose 自实现的 promise
mongoose.Promise = global.Promise;

// 把 mongoose 的 schema 取出来
const Schema = mongoose.Schema;

// db 绑定 连接失败 事件
db.on('error', (err) => {
    console.log(' blogprojectTest 连接数据库失败');
    console.log(err);
});

// db 绑定 连接成功 事件
db.on('open', () => {
    console.log(' blogprojectTest 数据库连接成功');
});


module.exports = {
    db, 
    Schema
};


