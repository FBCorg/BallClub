/**
 * Created by yongqiang on 2018/8/12.
 */
/**
 * [BDError 错误模块]
 * @param {string} message [错误信息]
 * @param {string} code    [错误码]
 */

let BDError = function(message,code){
    this.message=message;
    this.code=code;
};

BDError.prototype=new Error();
module.exports = BDError;
