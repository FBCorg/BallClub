/**
 * 存储相关的服务
 *
 */

// 对外暴露的对象
let storageService = {};

// region 常量定义
const Promise = require('../util/promise');

// const accountInfo = require('../base/AccountInfo');

// 打日志用的TAG
// const TAG = "StorageService";
// const FtLog = require('../base/FtLog');

// 个人数据，与用户相关
const STORAGE_TYPE_PERSON = 0;

// 全局数据
const STORAGE_TYPE_GLOBAL = 1;

// 分隔符
const STORAGE_SEPARATOR = "#";

// 全局数据的标识
const STORAGE_GLOBAL_FLAG = "global";
// endregion

// region 【游客】对外公开的方法
/**
 * 【同步方法】从个人数据 -> 取数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @return {string|object} key对应的value值
 */
storageService.getStorageForGuestSync = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_PERSON,
        isGuest: true
    };

    return getStorageSync(opt);
};
// endregion

// region 【个人数据】对外的公开的方法
/**
 * 存数据 -> 个人数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {string|Object} options.data 要存储的内容
 * @return {Promise} 异步回调
 *      成功 res={errMsg: "setStorage:ok"}
 */
storageService.setStorageToPerson = function (options) {
    let opt = {
        key: options.key,
        data: options.data,
        storageType: STORAGE_TYPE_PERSON
    };

    return setStorage(opt);
};

/**
 * 【同步方法】存数据 -> 个人数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {string|Object} options.data 要存储的内容
 */
storageService.setStorageToPersonSync = function (options) {
    let opt = {
        key: options.key,
        data: options.data,
        storageType: STORAGE_TYPE_PERSON
    };

    setStorageSync(opt);
};

/**
 * 从个人数据 -> 取数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @return {Promise} 异步回调
 *      成功 res={data, errMsg: "setStorage:ok"}
 */
storageService.getStorageForPerson = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_PERSON
    };

    return getStorage(opt);
};

/**
 * 【同步方法】从个人数据 -> 取数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {number} options.uid 指定uid。可选参数，默认无该参数
 * @return {string|object} key对应的value值
 */
storageService.getStorageForPersonSync = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_PERSON,
        uid: options.uid
    };

    return getStorageSync(opt);
};

/**
 * 从个人数据 -> 移除数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @return {Promise} 异步回调
 */
storageService.removeStorageForPerson = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_PERSON
    };

    return removeStorage(opt);
}

/**
 * 【同步方法】从个人数据 ->移除数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 */
storageService.removeStorageForPersonSync = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_PERSON
    };

    removeStorageSync(opt);
}

// endregion

// region 【公共数据】对外的公开的方法
/**
 * 存数据 -> 公共数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {string|Object} options.data 要存储的内容
 * @return {Promise} 异步回调
 *      成功 res={errMsg: "setStorage:ok"}
 */
storageService.setStorageToGlobal = function (options) {
    let opt = {
        key: options.key,
        data: options.data,
        storageType: STORAGE_TYPE_GLOBAL
    };

    return setStorage(opt);
};

/**
 * 【同步方法】存数据 -> 公共数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {string|Object} options.data 要存储的内容
 */
storageService.setStorageToGlobalSync = function (options) {
    let opt = {
        key: options.key,
        data: options.data,
        storageType: STORAGE_TYPE_GLOBAL
    };

    setStorageSync(opt);
};

/**
 * 从公共数据 -> 取数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @return {Promise} 异步回调
 *      成功 res={data, errMsg: "setStorage:ok"}
 */
storageService.getStorageForGlobal = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_GLOBAL
    };

    return getStorage(opt);
};

/**
 * 【同步方法】从公共数据 -> 取数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @return {string|object} key对应的value值
 */
storageService.getStorageForGlobalSync = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_GLOBAL
    };

    return getStorageSync(opt);
};

/**
 * 从公共数据 -> 移除数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @return {Promise} 异步回调
 */
storageService.removeStorageForGlobal = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_GLOBAL
    };

    return removeStorage(opt);
}

/**
 * 【同步方法】从公共数据 -> 移除数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 */
storageService.removeStorageForGlobalSync = function (options) {
    let opt = {
        key: options.key,
        storageType: STORAGE_TYPE_GLOBAL
    };

    removeStorageSync(opt);
}

/**
 * 测试代码，慎用
 */
storageService.clearStorageSync = function () {
    clearStorageSync();
}

// endregion

// region 私有方法方法

/**
 * 存数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {string|Object} options.data 要存储的内容
 * @param {number} options.storageType 存储类型；
 * @param {boolean} options.isGuest 【可选参数，默认无】true是游客，如果没有该参数则为undefine，undefine逻辑判断的是时候是false
 * @param {number} options.uid  【可选参数，默认无】如果有uid，则优先使用该uid
 * @return {Promise} 异步回调
 *      成功 res={errMsg: "setStorage:ok"}
 */
function setStorage(options) {
    // 处理key
    options.key = (options.storageType === STORAGE_TYPE_GLOBAL) ? calKeyForGlobal(options.key) : calKeyForPerson(options);

    return new Promise((resolve, reject) => {
        options.success = (res) => {
            resolve(res);
        };

        options.fail = (err) => {
            // FtLog.w(TAG,  "setStorage()", "fail res:" + err);
            reject(err)
        };

        // 调用微信API
        wx.setStorage(options);

        checkStorageSize();
    });
}

/**
 * 【同步方法】存数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {string|Object} options.data 要存储的内容
 * @param {number} options.storageType 存储类型；
 * @param {boolean} options.isGuest 【可选参数，默认无】true是游客，如果没有该参数则为undefine，undefine逻辑判断的是时候是false
 * @param {number} options.uid  【可选参数，默认无】如果有uid，则优先使用该uid
 */
function setStorageSync(options) {
    // 处理key
    options.key = (options.storageType === STORAGE_TYPE_GLOBAL) ? calKeyForGlobal(options.key) : calKeyForPerson(options);

    try {
        wx.setStorageSync(options.key, options.data);

        checkStorageSize();
    } catch (e) {
        // FtLog.w(TAG,  "setStorageSync()", "e: " + e);
    }
}

/**
 * 取数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {number} options.storageType 存储类型；
 * @param {boolean} options.isGuest 【可选参数，默认无】true是游客，如果没有该参数则为undefine，undefine逻辑判断的是时候是false
 * @param {number} options.uid  【可选参数，默认无】如果有uid，则优先使用该uid
 * @return {Promise} 异步回调
 *      成功 res={data, errMsg: "getStorage:ok"}
 */
function getStorage(options) {
    // 处理key
    options.key = (options.storageType === STORAGE_TYPE_GLOBAL) ? calKeyForGlobal(options.key) : calKeyForPerson(options);

    return new Promise((resolve, reject) => {
        options.success = (res) => {
            // res.key = parseKey(options.key);
            resolve(res);
        };

        options.fail = (err) => {
            // FtLog.w(TAG,  "getStorage()", "fail res: " + err);
            reject(err)
        };

        // 调用微信API
        wx.getStorage(options);
    });
}

/**
 * 【同步方法】取数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {number} options.storageType 存储类型；
 * @param {boolean} options.isGuest 【可选参数，默认无】true是游客，如果没有该参数则为undefine，undefine逻辑判断的是时候是false
 * @param {number} options.uid  【可选参数，默认无】如果有uid，则优先使用该uid
 * @return {string|object} key对应的data值
 */
function getStorageSync(options) {
    // 处理key
    options.key = (options.storageType === STORAGE_TYPE_GLOBAL) ? calKeyForGlobal(options.key) : calKeyForPerson(options);

    try {
        return wx.getStorageSync(options.key);
    } catch (e) {
        // FtLog.w(TAG,  "getStorageSync()", "e: " + e);
    }
}

/**
 * 移除数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {number} options.storageType 存储类型；
 * @param {boolean} options.isGuest 【可选参数，默认无】true是游客，如果没有该参数则为undefine，undefine逻辑判断的是时候是false
 * @param {number} options.uid  【可选参数，默认无】如果有uid，则优先使用该uid
 * @return {Promise} 异步回调  成功 res = {errMsg: "removeStorage:ok"}
 */
function removeStorage(options) {
    // 处理key
    options.key = (options.storageType === STORAGE_TYPE_GLOBAL) ? calKeyForGlobal(options.key) : calKeyForPerson(options);

    return new Promise((resolve, reject) => {
        options.success = (res) => {
            resolve(res);
        };

        options.fail = (err) => {
            // FtLog.w(TAG,  "removeStorage()", "fail res: " + err);
            reject(err)
        };

        // 调用微信API
        wx.removeStorage(options);
    });
}

/**
 * 【同步方法】移除数据
 * @param {object} options 参数对象
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {number} options.storageType 存储类型；
 * @param {boolean} options.isGuest 【可选参数，默认无】true是游客，如果没有该参数则为undefine，undefine逻辑判断的是时候是false
 * @param {number} options.uid  【可选参数，默认无】如果有uid，则优先使用该uid
 */
function removeStorageSync(options) {
    // 处理key
    options.key = (options.storageType === STORAGE_TYPE_GLOBAL) ? calKeyForGlobal(options.key) : calKeyForPerson(options);

    try {
        wx.removeStorageSync(options.key)
    } catch (e) {
        // FtLog.w(TAG,  "removeStorageSync()", "e: " + e);
    }
}

/**
 * 清理数据缓存，包括Global和Person的
 */
function clearStorageSync() {
    try {
        wx.clearStorageSync()
    } catch (e) {
        // FtLog.w(TAG,  "clearStorageSync()", "e: " + e);
    }
}

/**
 * 检查存储空间
 */
function checkStorageSize() {
    try {
        var res = wx.getStorageInfoSync();

        // 大于95%的时候，触发清理操作
        if (res.currentSize / res.limitSize >= 0.95) {
            // FtLog.w(TAG, 'checkStorageSize()', 'key: '+ res.keys + " currentSize: " + res.currentSize + " limitSize:" + res.limitSize);
            clear(res.keys);
        }
    } catch (e) {
        // FtLog.w(TAG,  "checkStorageSize()", "e: " + e);
    }
}

/**
 * 清除非当前牛牛号的数据
 */
function clear(keys) {
    // let uid = accountInfo.getUid() + "";// 当前牛牛号，先变为字符串
    //
    // for (let i = 0, size = keys.length; i < size; i++) {
    //     let key = keys[i];
    //     let tmpKey = parseKeyPrefix(key);
    //
    //     // 删其他帐号的数据
    //     if (!(tmpKey === uid || tmpKey === STORAGE_GLOBAL_FLAG)) {
    //         FtLog.i(TAG, 'clearStorageSync()',"clear Key: " + key);
    //
    //         try {
    //             wx.removeStorageSync(key)
    //         } catch (e) {
    //             FtLog.w(TAG,  "clearStorageSync()", "e: " + e);
    //         }
    //     }
    // }
}

/**
 * 计算用户相关的存储用的key
 * @param {string} options.key 调用者自己维护的在app内唯一值
 * @param {boolean} options.isGuest 【可选参数，默认无】true是游客，如果没有该参数则为undefine，undefine逻辑判断的是时候是false
 * @param {number} options.uid  【可选参数，默认无】如果有uid，则优先使用该uid
 * @returns {string} 处理过的key
 */
function calKeyForPerson(options) {
    if (typeof options.key !== 'string') {
        // FtLog.w(TAG,  "calKeyForPerson()", "key: " + options.key);
    }

    let currentUid;

    if(options.isGuest) {
        // true
        // currentUid = accountInfo.getGuestFlag();
    } else if(options.uid) {
        // 非0
        // currentUid = options.uid;
    } else {
        // 【isGuest】为false或者undefine，或者【uid】为0或者undefine
        // currentUid = accountInfo.getUid();// 获取当前牛牛号
    }
    return currentUid + STORAGE_SEPARATOR + options.key;
};

/**
 * 计算全局的存储用的key
 * @param key key 调用者自己维护的在app内唯一值
 * @returns {string} 处理过的key
 */
function calKeyForGlobal(key) {
    if (typeof key !== 'string') {
        // FtLog.w(TAG,  "calKeyForGlobal()", "key: " + key);
    }

    return STORAGE_GLOBAL_FLAG + STORAGE_SEPARATOR + key;
};

/**
 * 解析存储用的key(全局和用户相关的规则一样，用一个即可)
 * @param {string} key 需要解析的key
 * @return {string} 调用者自己维护的在app内唯一值
 */
function parseKeyPrefix(key) {
    if (typeof key !== 'string') {
        // FtLog.w(TAG,  "parseKeyPrefix()", "key: " + key);
    }

    let arry = key.split("#", 2);
    if (arry.length < 2) {
        // FtLog.w(TAG,  "parseKeyPrefix()", "arry: " + arry);
    }

    return arry[0];
}

/**
 * 解析存储用的key(全局和用户相关的规则一样，用一个即可)
 * @param {string} key 需要解析的key
 * @return {string} 调用者自己维护的在app内唯一值
 */
function parseKey(key) {
    if (typeof key !== 'string') {
        // FtLog.w(TAG,  "parseKey()", "key: " + key);
    }

    let arry = key.split("#", 2);
    if (arry.length < 2) {
        // FtLog.w(TAG,  "parseKey()", "arry: " + arry);
    }

    return arry[1];
}
// endregion

module.exports = storageService;
