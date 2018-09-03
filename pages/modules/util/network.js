/**
 * Created by yongqiang on 2018/8/12.
 */

/**
 * 网络请求模块
 * 封装了wx.request和返回值是否成功的判断
 * @type {Promise}
 */
let network = {};

// region 成员变量
let Promise = require('./promise');
let BDError = require('./BDError');
let extend = require('./extend');

network.doRequest = function(options) {
    return new Promise((resolve, reject) => {
        /**
         * 请求成功时的回调函数
         * @param  {Object} res 返回的数据
         * @example
         * {
         *     statusCode: 200,
         *     errMsg: '',
         *     data: {} //server返回的data
         * }
         * @return {Undefined}
         */
        options.success = (res) => {
            if(+res.statusCode !== 200){
                reject(new BDError('HTTP ERROR, Status ' + res.statusCode));
                return;
            }
            if(!res.data){ // res.data 数据才是我们服务器返回的是数据。故这里判断一下
                reject(new BDError('No Response Data.'));
                return;
            }
            // if(+res.data.code !== 0){
            //     reject(new Error('ERROR: ' + res.data.message));
            //     return;
            // }
            if( typeof options.isFail === 'function' && options.isFail(res.data)){// 因为各方定的协议不统一，故需要业务方自己判断是否成功。所有有isFail回调方法。该方法目前为可选
                // console.log('isFail:', res.data);
                reject(options.getError(res.data));
            }
            resolve(res.data);
        };
        /**
         * 请求失败时的回调函数
         * @param  {Object} err 错误对象
         * @return {Undefined}
         */
        options.fail = (err) => {
            reject(new BDError(err.errMsg)); // new Error返回的是Object{line:508, column: 29}, 所以用new BDError()
        };

        let AccountService = require('../accountService');
        if (!options.data.thirdSessionId && AccountService.getThirdSessionId()) {
            options.data.thirdSessionId = AccountService.getThirdSessionId();
        }
        console.log('request content is ' + JSON.stringify(options));

        // 发起请求
        wx.request(options);
    });
}

network.doFormRequest=function(options){
    options.header=extend(options.header,{
        'content-type': 'application/x-www-form-urlencoded'
    });
    return this.doRequest(options);
}

module.exports = network;