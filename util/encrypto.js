const crypto = require('crypto');

// 加密对象 --> 返回加密成功的数据
module.exports = function (password, key = "handsome") {

    // 使用 hmac-sha256 加密, key 值可以外传, 也可以默认
    const hmac = crypto.createHmac('sha256', key);

    // 加密密码
    hmac.update(password);

    // 输出 加密后的 密码
    const passwordHmac = hmac.digest('hex');

    return passwordHmac;

};