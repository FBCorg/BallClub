/**
 * Created by yongqiang on 2018/8/13.
 */

import {kNRWxLogin,
    kNRUpdateUserInfo,
    kNRSaveUserInfo,
    kNRQueryMatchData,
    kUserSexType,
    kUserFootBallPositionType} from './util/constants'
const network = require('./util/network');
const Promise = require('./util/promise');
const BDError = require('./util/BDError');
const StorageService = require('./storage/StorageService');
const StorageKeys = require('./storage/StorageKeys');
const LOG_TAG = 'AccountService ';


let _hasUserInfo = false;
let _userInfo = {
    thirdSessionId: "",
    role: 0,
    sex: 0,
    name: '',
    userId: '',
    footballPosition: '',
    age: 18,
};

let _hasWxUserInfo = false;
let _wxInfo = {
    nickName: "",
    avatarUrl: "",
};

let accountService = {};

let doRequest = (options) => {
    options.isFail = function(data) {
        if (!data.error) {
            return false;
        }
        // FtLog.e(TAG, "doRequest()", "e: ", data.error);
        return true;
    };
    options.getError = (data) => {
        let error = data.error;
        return new BDError(error.error_msg, error.error_code);
    }
    return network.doRequest(options);
}

accountService.updateUserInfo = function (info) {
    return doRequest({
        url: kNRUpdateUserInfo,
        method: 'POST',
        data: {
            name: info.name ? info.name : getNickName(),
            sex: info.sex ? info.sex : getSex(),
            age: info.age ? info.age : getAge(),
            _: Date.now(),
        }
    }).then((res) => {
        console.log(LOG_TAG + JSON.stringify(res));
        return res;
    }).catch((e) => {
        console.log(LOG_TAG + JSON.stringify(e));
    });
}

accountService.getUserInfo = function () {
    return new Promise((resolve, reject) => {
        if (_userInfo.thirdSessionId !== '') {
            resolve(_userInfo);
        }
        // let loginInfo = StorageService.getStorageForGlobalSync({
        //     'key': StorageKeys.LoginInfo
        // });
        let loginInfo = null;
        if (!loginInfo) {
            wxLogin().then((res) => {
                // console.log(LOG_TAG + 'bindWxLogin '+JSON.stringify(res));
                if (+res['errorCode'] == 0) {
                    StorageService.setStorageToGlobal({
                        'key': StorageKeys.LoginInfo,
                        'data': _userInfo
                    })
                    _userInfo = res['result'];
                    _hasUserInfo = true;
                    resolve(_userInfo);
                }
            }).catch((err) => {
                console.log(LOG_TAG + 'bindWxLogin error');
                reject(err);
            });
        } else {
            _userInfo = loginInfo;
            _hasUserInfo = true;
            resolve(_userInfo);
        }
    })
}

accountService.getWxUserInfo = function () {
    if (_hasWxUserInfo) {
        return new Promise((resolve, reject) => {
            resolve(_wxInfo);
        });
    } else {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                success: res => {
                    setWxInfo(res.userInfo);
                    resolve(res.userInfo);
                },
                fail: function (err) {
                    console.log(LOG_TAG + 'getWxUserInfo error');
                }
            })
        })
    }
}

accountService.joinClub = function () {
    return doRequest({
        url: kNRSaveUserInfo,
        method: 'POST',
        data: {
            name: getNickName(),
            sex: getSex(),
            age: getAge(),
            footballPosition: getFootballPostion(),
        }
    }).then((res) => {
        console.log(LOG_TAG + JSON.stringify(res));
        return res;
    }).catch((e) => {
        console.log(LOG_TAG + JSON.stringify(e));
    })
}

accountService.queryMatchData = function () {
    return doRequest({
        url: kNRQueryMatchData,
        method: 'POST',
        data: {

        }
    }).then((res) => {
        console.log(LOG_TAG + JSON.stringify(res));
        // return res;
    }).catch((e) => {
        console.log(LOG_TAG + JSON.stringify(e));
    })
}


accountService.getThirdSessionId = function () {
    if (_hasUserInfo) {
        return _userInfo.thirdSessionId;
    }
    return "";
}

let getNickName = function () {
    if (_hasWxUserInfo) {
        return _wxInfo.nickName;
    }
    return 'dick';
}

let getAge = function () {
    if (_hasUserInfo) {
        return _userInfo.age;
    }
    return 18;
}

let getSex = function () {
    if (_hasUserInfo) {
        return _userInfo.sex;
    }
    return kUserSexType.Male.value;
}

let getFootballPostion = function () {
    if (_hasUserInfo) {
        return _userInfo.footballPosition;
    }
    return kUserFootBallPositionType.Keeper.value;
}

let setWxInfo = function(info) {
    _wxInfo = info;
    _hasWxUserInfo = true;
};

let wxLogin = function() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: function(res) {
                // console.log(LOG_TAG + 'wxLogin success ' + JSON.stringify(res));
                if (res.code) {
                    doRequest({
                        url: kNRWxLogin,
                        method: 'POST',
                        data: {
                            code: res.code,
                            _: Date.now(),
                        }
                    }).then((res) => {
                        // console.log(LOG_TAG + JSON.stringify(res));
                        resolve(res);
                    }).catch((e) => {
                        console.log(LOG_TAG + JSON.stringify(e));
                    });
                }
            },
            fail: function(err) {
                // FtLog.e(TAG, 'wx.login()-fail', err.errMsg);
                reject(new BDError(err.errMsg));
            }
        });
    });
};

module.exports = accountService;