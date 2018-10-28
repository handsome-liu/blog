const { Schema } = require('./config');

// 设置 user 集合的 数据类型, 取消 mongo 自带的 _v属性
const UserSchema = new Schema({
    username: String,
    password: String,
}, {
        versionKey: false
    });


// 导出
module.exports = UserSchema;
